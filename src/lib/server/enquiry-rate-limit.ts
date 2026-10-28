import "server-only";
import { createHmac, randomBytes } from "node:crypto";
import { isIP } from "node:net";

const WINDOW_MS = 60_000;
const ATTEMPTS_PER_WINDOW = 10;

type Options = {
  now?: () => number;
  trustVercel?: () => boolean;
  maxClients?: number;
};

// A bounded, per-process backstop. Vercel WAF supplies the shared production limit.
export function createEnquiryRateLimiter({
  now = Date.now,
  trustVercel = () => process.env.VERCEL === "1",
  maxClients = 10_000,
}: Options = {}) {
  const clients = new Map<string, number[]>();
  const salt = randomBytes(32);

  return function takeSlot(request: Request): boolean {
    const forwarded = trustVercel()
      ? request.headers.get("x-vercel-forwarded-for")?.trim()
      : undefined;
    // Never trust arbitrary proxy headers on a directly accessible Node.js host.
    const identity = forwarded && isIP(forwarded) ? forwarded : "local";
    const key = createHmac("sha256", salt).update(identity).digest("hex");
    const cutoff = now() - WINDOW_MS;
    const attempts = (clients.get(key) ?? []).filter((time) => time > cutoff);

    if (!clients.has(key) && clients.size >= maxClients) {
      for (const [client, times] of clients) {
        if (times[times.length - 1] <= cutoff) clients.delete(client);
      }
      // Fail closed when full; never evict an active client's allowance.
      if (clients.size >= maxClients) return false;
    }
    if (attempts.length >= ATTEMPTS_PER_WINDOW) return false;
    attempts.push(cutoff + WINDOW_MS);
    clients.set(key, attempts);
    return true;
  };
}
