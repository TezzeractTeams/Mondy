"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AudioGraph = {
  context: AudioContext;
  analyser: AnalyserNode;
};

const audioGraphs = new WeakMap<HTMLAudioElement, AudioGraph>();

type AudioWaveformProps = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  src: string;
  playing: boolean;
  currentTime: number;
  duration: number;
  className?: string;
  barCount?: number;
};

async function decodeWaveformPeaks(src: string, barCount: number): Promise<number[]> {
  const response = await fetch(src);
  const arrayBuffer = await response.arrayBuffer();
  const audioContext = new AudioContext();
  try {
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const channelData = audioBuffer.getChannelData(0);
    const samplesPerBar = Math.max(1, Math.floor(channelData.length / barCount));
    const peaks: number[] = [];

    for (let i = 0; i < barCount; i++) {
      const start = i * samplesPerBar;
      const end = Math.min(channelData.length, start + samplesPerBar);
      let max = 0;
      let sumSq = 0;
      for (let j = start; j < end; j++) {
        const v = Math.abs(channelData[j] ?? 0);
        max = Math.max(max, v);
        sumSq += v * v;
      }
      const rms = Math.sqrt(sumSq / (end - start || 1));
      peaks.push(max * 0.65 + rms * 0.35);
    }

    const peakMax = Math.max(...peaks, 0.001);
    return peaks.map((p) => {
      const n = p / peakMax;
      return Math.max(0.12, Math.pow(n, 0.82));
    });
  } finally {
    void audioContext.close();
  }
}

function mapFrequencyToBars(data: Uint8Array, barCount: number): number[] {
  const step = Math.max(1, Math.floor(data.length / barCount));
  const bars: number[] = [];
  for (let i = 0; i < barCount; i++) {
    let peak = 0;
    const start = i * step;
    const end = Math.min(data.length, start + step);
    for (let j = start; j < end; j++) {
      peak = Math.max(peak, data[j] ?? 0);
    }
    bars.push(Math.pow(peak / 255, 0.55));
  }
  return bars;
}

function mapTimeDomainToBars(data: Uint8Array, barCount: number): number[] {
  const step = Math.max(1, Math.floor(data.length / barCount));
  const bars: number[] = [];
  for (let i = 0; i < barCount; i++) {
    let peak = 0;
    const start = i * step;
    const end = Math.min(data.length, start + step);
    for (let j = start; j < end; j++) {
      peak = Math.max(peak, Math.abs((data[j] ?? 128) - 128));
    }
    bars.push(Math.pow(peak / 128, 0.5));
  }
  return bars;
}

function getOrCreateAudioGraph(audio: HTMLAudioElement): AudioGraph {
  const existing = audioGraphs.get(audio);
  if (existing) return existing;

  const context = new AudioContext();
  const source = context.createMediaElementSource(audio);
  const analyser = context.createAnalyser();
  analyser.fftSize = 256;
  analyser.smoothingTimeConstant = 0.42;
  source.connect(analyser);
  analyser.connect(context.destination);

  const graph = { context, analyser };
  audioGraphs.set(audio, graph);
  return graph;
}

function barScale(
  peak: number,
  live: number | undefined,
  playing: boolean,
  idlePulse: number,
): number {
  const min = 0.1;
  const max = 1;

  if (playing && live != null) {
    const energy = Math.pow(live, 0.6);
    const blended = peak * 0.28 + energy * 1.05;
    return min + Math.min(1, blended) * (max - min);
  }

  const idle = peak * idlePulse;
  return min + idle * (max - min) * 0.92;
}

export function AudioWaveform({
  audioRef,
  src,
  playing,
  currentTime,
  duration,
  className,
  barCount = 64,
}: AudioWaveformProps) {
  const [peaks, setPeaks] = useState<number[]>([]);
  const [liveLevels, setLiveLevels] = useState<number[] | null>(null);
  const [idlePulse, setIdlePulse] = useState(1);
  const rafRef = useRef<number>(0);
  const idleRafRef = useRef<number>(0);

  useEffect(() => {
    let cancelled = false;
    void decodeWaveformPeaks(src, barCount).then((decoded) => {
      if (!cancelled) setPeaks(decoded);
    });
    return () => {
      cancelled = true;
    };
  }, [src, barCount]);

  useEffect(() => {
    if (playing || peaks.length === 0) {
      return () => cancelAnimationFrame(idleRafRef.current);
    }

    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      setIdlePulse(0.88 + 0.12 * Math.sin(t * 2.4));
      idleRafRef.current = requestAnimationFrame(tick);
    };
    idleRafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(idleRafRef.current);
  }, [playing, peaks.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !playing) {
      return () => cancelAnimationFrame(rafRef.current);
    }

    const { context, analyser } = getOrCreateAudioGraph(audio);
    const freqData = new Uint8Array(analyser.frequencyBinCount);
    const timeData = new Uint8Array(analyser.fftSize);

    const tick = async () => {
      if (context.state === "suspended") {
        await context.resume();
      }
      analyser.getByteFrequencyData(freqData);
      analyser.getByteTimeDomainData(timeData);

      const freqBars = mapFrequencyToBars(freqData, barCount);
      const timeBars = mapTimeDomainToBars(timeData, barCount);
      const merged = freqBars.map((f, i) => Math.min(1, f * 0.55 + (timeBars[i] ?? 0) * 0.65));
      setLiveLevels(merged);
      rafRef.current = requestAnimationFrame(tick);
    };

    void tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      setLiveLevels(null);
    };
  }, [playing, audioRef, barCount]);

  const progress = duration > 0 ? Math.min(1, currentTime / duration) : 0;
  const playheadIndex = Math.floor(progress * barCount);
  const bars = peaks.length > 0 ? peaks : Array.from({ length: barCount }, () => 0.15);

  const seek = (clientX: number, rect: DOMRect) => {
    const audio = audioRef.current;
    if (!audio || duration <= 0) return;
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    audio.currentTime = ratio * duration;
  };

  return (
    <div
      className={cn("relative w-full cursor-pointer touch-none", className)}
      role="slider"
      aria-label="Recording waveform"
      aria-valuemin={0}
      aria-valuemax={duration || 0}
      aria-valuenow={currentTime}
      tabIndex={0}
      onKeyDown={(e) => {
        const audio = audioRef.current;
        if (!audio || duration <= 0) return;
        const step = duration * 0.05;
        if (e.key === "ArrowRight") {
          e.preventDefault();
          audio.currentTime = Math.min(duration, audio.currentTime + step);
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          audio.currentTime = Math.max(0, audio.currentTime - step);
        }
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        seek(e.clientX, e.currentTarget.getBoundingClientRect());
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (e.buttons !== 1) return;
        seek(e.clientX, e.currentTarget.getBoundingClientRect());
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 z-0 h-8 -translate-y-1/2 rounded-full bg-white/10 blur-md"
        aria-hidden
      />
      <div className="relative flex h-12 w-full items-center gap-[2px] md:h-14" aria-hidden>
        {bars.map((peak, i) => {
          const isPast = i <= playheadIndex;
          const isPlayhead = i === playheadIndex && duration > 0;
          const live = liveLevels?.[i];
          const scale = barScale(peak, live, playing, idlePulse);
          const stagger = playing ? 0 : Math.sin(i * 0.55) * 0.06;

          return (
            <div key={i} className="flex h-full min-w-0 flex-1 items-center justify-center">
              <span
                className={cn(
                  "block w-full origin-center rounded-full bg-white will-change-transform",
                  playing ? "duration-75" : "duration-300",
                  "transition-[transform,opacity,box-shadow]",
                  isPast ? "opacity-100" : "opacity-[0.28]",
                  isPlayhead &&
                    "shadow-[0_0_10px_rgba(255,255,255,0.85),0_0_20px_rgba(255,255,255,0.35)]",
                  playing && isPast && "opacity-100",
                )}
                style={{
                  height: "100%",
                  transform: `scaleY(${Math.min(1.12, scale + stagger)})`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
