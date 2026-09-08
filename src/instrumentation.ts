export async function register() {
  if (process.env.NEXT_RUNTIME === "edge") return;
  const { cacheGeminiApiKey, readGeminiApiKey } = await import("./lib/serverEnv");
  cacheGeminiApiKey(readGeminiApiKey());
}
