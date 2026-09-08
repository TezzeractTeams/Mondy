import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const KEY_NAMES = ["GEMINI_API_KEY", "GOOGLE_GENERATIVE_AI_API_KEY", "GOOGLE_API_KEY"] as const;

type GlobalGemini = typeof globalThis & { __MONDY_GEMINI_API_KEY?: string };

function parseEnvFile(filePath: string): Record<string, string> {
  if (!existsSync(filePath)) return {};
  const parsed: Record<string, string> = {};
  for (const rawLine of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq <= 0) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    parsed[key] = value;
  }
  return parsed;
}

function envSearchDirs(): string[] {
  const cwd = process.cwd();
  return [cwd, join(cwd, ".."), join(cwd, "Mondy")];
}

function fromFiles(name: string): string {
  for (const dir of envSearchDirs()) {
    for (const file of [".env.local", ".env"]) {
      const value = parseEnvFile(join(dir, file))[name]?.trim();
      if (value) return value;
    }
  }
  return "";
}

function fromProcess(name: string): string {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : "";
}

function stripQuotes(value: string): string {
  return value.replace(/^["']|["']$/g, "").trim();
}

export function readServerEnv(name: string): string {
  return stripQuotes(fromFiles(name) || fromProcess(name));
}

export function readGeminiApiKey(): string {
  const cached = (globalThis as GlobalGemini).__MONDY_GEMINI_API_KEY?.trim();
  if (cached) return cached;
  for (const name of KEY_NAMES) {
    const value = readServerEnv(name);
    if (value) return value;
  }
  return "";
}

export function cacheGeminiApiKey(key: string): void {
  if (key) (globalThis as GlobalGemini).__MONDY_GEMINI_API_KEY = key;
}
