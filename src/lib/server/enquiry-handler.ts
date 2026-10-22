import "server-only";
import { randomUUID } from "node:crypto";
import { parseEnquiry } from "@/lib/enquiry-validation";
import { sendEnquiry } from "@/lib/server/mailer";
import type { Enquiry, EnquiryResponse } from "@/types/forms";

const MAX_BODY_BYTES = 16 * 1024;
const WINDOW_MS = 60_000;
const attempts: number[] = [];

function takeSlot() {
  const now = Date.now();
  while (attempts.length && attempts[0] <= now - WINDOW_MS) attempts.shift();
  if (attempts.length >= 10) return false;
  attempts.push(now);
  return true;
}

function expectedOrigin(request: Request) {
  const configured = process.env.SITE_URL?.trim();
  if (configured) {
    const url = new URL(configured);
    if (url.protocol !== "https:" || url.username || url.password)
      throw new Error("Invalid origin configuration.");
    return url.origin;
  }
  if (process.env.NODE_ENV === "production")
    throw new Error("Missing production origin.");
  return new URL(request.url).origin;
}

class BodyTooLarge extends Error {}

async function readJson(request: Request): Promise<unknown> {
  if (!request.body) throw new SyntaxError("Missing body");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new BodyTooLarge();
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
}

function reply(body: EnquiryResponse, status: number, retryAfter?: string) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...(retryAfter ? { "Retry-After": retryAfter } : {}),
    },
  });
}

type Dependencies = {
  getOrigin: (request: Request) => string;
  send: (enquiry: Enquiry) => Promise<void>;
  takeSlot: () => boolean;
};

export function createEnquiryHandler(overrides: Partial<Dependencies> = {}) {
  const dependencies: Dependencies = {
    getOrigin: expectedOrigin,
    send: sendEnquiry,
    takeSlot,
    ...overrides,
  };
  return async function handleEnquiry(request: Request): Promise<Response> {
    let origin: string;
    try {
      origin = dependencies.getOrigin(request);
    } catch {
      return reply(
        {
          ok: false,
          message: "Email is unavailable right now. Please use the email link.",
        },
        503,
      );
    }
    if (request.headers.get("origin") !== origin) {
      return reply(
        { ok: false, message: "Please send your enquiry from this website." },
        403,
      );
    }
    if (
      request.headers
        .get("content-type")
        ?.split(";")[0]
        .trim()
        .toLowerCase() !== "application/json"
    ) {
      return reply({ ok: false, message: "Send your enquiry as JSON." }, 415);
    }
    if (!dependencies.takeSlot()) {
      return reply(
        {
          ok: false,
          message:
            "Too many enquiries right now. Please wait a minute before trying again.",
        },
        429,
        "60",
      );
    }
    let input: unknown;
    try {
      input = await readJson(request);
    } catch (error) {
      return error instanceof BodyTooLarge
        ? reply({ ok: false, message: "Your enquiry is too large." }, 413)
        : reply(
            {
              ok: false,
              message:
                "We could not read your enquiry. Check your details and try again.",
            },
            400,
          );
    }
    const parsed = parseEnquiry(input);
    if (!("enquiry" in parsed)) return reply({ ok: false, ...parsed }, 400);
    try {
      await dependencies.send(parsed.enquiry);
      return reply({ ok: true }, 200);
    } catch {
      // SMTP errors can include recipient addresses and message content. Never log them.
      console.error("Enquiry mail failed", { requestId: randomUUID() });
      return reply(
        {
          ok: false,
          message:
            "We couldn't confirm whether your enquiry was sent. Please check by email before submitting it again.",
        },
        503,
      );
    }
  };
}
