"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { ComponentProps } from "react";

export const DEFAULT_DOTLOTTIE_SRC =
  "https://lottie.host/b65780ec-7831-4170-81a2-05716bef8927/7CZFNz9dQb.lottie";

export type DotLottiePlayerProps = Omit<
  ComponentProps<typeof DotLottieReact>,
  "src"
> & {
  src?: string;
};

export function DotLottiePlayer({
  src = DEFAULT_DOTLOTTIE_SRC,
  loop = true,
  autoplay = true,
  ...rest
}: DotLottiePlayerProps) {
  return (
    <DotLottieReact {...rest} src={src} loop={loop} autoplay={autoplay} />
  );
}
