function requireEnv(key: string, fallbackKey?: string): string {
  const val = process.env[key] || (fallbackKey ? process.env[fallbackKey] : undefined);
  if (!val || val.trim() === "") {
    const errorMsg = `[CRITICAL CONFIG ERROR] Missing required environment variable: ${key}${
      fallbackKey ? ` (or ${fallbackKey})` : ""
    }. Application startup aborted.`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
  return val.trim();
}

export const env = {
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: requireEnv("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"),
  CLERK_SECRET_KEY: requireEnv("CLERK_SECRET_KEY"),
  NEXT_PUBLIC_SUPABASE_URL: requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
} as const;
