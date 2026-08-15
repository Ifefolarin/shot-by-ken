const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;

// In-memory store: IP → array of request timestamps
// Resets on cold start — appropriate for a contact form, not for auth endpoints.
const store = new Map<string, number[]>();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = store.get(ip) ?? [];

  // Keep only timestamps within the current window
  const recent = timestamps.filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    store.set(ip, recent);
    return false;
  }

  store.set(ip, [...recent, now]);
  return true;
}
