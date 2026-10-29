export const consultationInterests = [
  "Tax Planning",
  "Tax Preparation",
  "Bookkeeping",
  "Virtual CFO",
  "Accounting System Setup",
  "AI Implementation",
  "General inquiry",
] as const;

export const consultationLimits = {
  name: 100,
  email: 254,
  phone: 40,
  message: 5000,
  body: 20_000,
  minSubmitMs: 3_000,
  maxAgeMs: 12 * 60 * 60 * 1000,
  rateWindowMs: 10 * 60 * 1000,
  rateMax: 10,
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mailboxPattern =
  /^(?:[^<>\r\n]+<\s*[^\s@]+@[^\s@]+\.[^\s@]+\s*>|[^\s@]+@[^\s@]+\.[^\s@]+)$/;

export type ConsultationErrorCode =
  | "validation"
  | "email"
  | "phone"
  | "interest"
  | "wait"
  | "rate"
  | "length"
  | "send";

export type ConsultationSubmission = {
  name: string;
  email: string;
  phone: string | null;
  interest: string | null;
  message: string;
};

const rateBuckets = new Map<string, number[]>();

export function clientAddress(request: Request): string {
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp.slice(0, 80);
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first.slice(0, 80);
  }
  return "unknown";
}

export function isRateLimited(ip: string, now = Date.now()): boolean {
  const windowStart = now - consultationLimits.rateWindowMs;
  const recent = (rateBuckets.get(ip) ?? []).filter((time) => time > windowStart);
  if (recent.length >= consultationLimits.rateMax) {
    rateBuckets.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateBuckets.set(ip, recent);
  return false;
}

export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function honeypotTripped(value: unknown): boolean {
  if (value == null) return false;
  if (typeof value !== "string") return true;
  return value.trim().length > 0;
}

export function submissionTiming(
  startedAt: unknown,
  now = Date.now(),
): "ok" | "wait" {
  const parsed =
    typeof startedAt === "number"
      ? startedAt
      : typeof startedAt === "string" && startedAt.trim()
        ? Number(startedAt)
        : Number.NaN;
  if (!Number.isFinite(parsed)) return "wait";
  const elapsed = now - parsed;
  if (elapsed < consultationLimits.minSubmitMs || elapsed > consultationLimits.maxAgeMs) {
    return "wait";
  }
  return "ok";
}

function oneLine(value: string): string {
  return value
    .replace(/[\u0000-\u001F\u007F]+/g, " ")
    .replace(/[ \t]+/g, " ")
    .trim();
}

function cleanMessage(value: string): string {
  return value
    .replace(/\r\n/g, "\n")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim();
}

export function isEmailAddress(value: string): boolean {
  return value.length <= consultationLimits.email && emailPattern.test(value);
}

export function isMailbox(value: string): boolean {
  return value.length <= 320 && mailboxPattern.test(value) && !/[\r\n]/.test(value);
}

export function validateConsultation(
  input: unknown,
):
  | { ok: true; value: ConsultationSubmission }
  | { ok: false; code: ConsultationErrorCode } {
  if (!input || typeof input !== "object") return { ok: false, code: "validation" };
  const record = input as Record<string, unknown>;
  const name = typeof record.name === "string" ? oneLine(record.name) : "";
  const email = typeof record.email === "string" ? oneLine(record.email) : "";
  const phoneRaw = typeof record.phone === "string" ? oneLine(record.phone) : "";
  const interestRaw =
    typeof record.interest === "string" ? oneLine(record.interest) : "";
  const message = typeof record.message === "string" ? cleanMessage(record.message) : "";

  if (!name || !email || !message) return { ok: false, code: "validation" };
  if (name.length > consultationLimits.name || message.length > consultationLimits.message) {
    return { ok: false, code: "length" };
  }
  if (!isEmailAddress(email)) return { ok: false, code: "email" };
  if (phoneRaw.length > consultationLimits.phone) return { ok: false, code: "phone" };
  if (
    interestRaw &&
    !consultationInterests.includes(
      interestRaw as (typeof consultationInterests)[number],
    )
  ) {
    return { ok: false, code: "interest" };
  }

  return {
    ok: true,
    value: {
      name,
      email,
      phone: phoneRaw || null,
      interest: interestRaw || null,
      message,
    },
  };
}

export function buildConsultationMessage(value: ConsultationSubmission): {
  subject: string;
  text: string;
} {
  const lines = [`Name: ${value.name}`, `Email: ${value.email}`];
  if (value.phone) lines.push(`Phone: ${value.phone}`);
  lines.push(
    `Interest: ${value.interest ?? "Not specified"}`,
    "",
    "Message:",
    value.message,
  );
  return {
    subject: `New consultation request from ${value.name}`,
    text: lines.join("\n"),
  };
}
