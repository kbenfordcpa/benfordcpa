import { NextResponse } from "next/server";
import {
  clientAddress,
  consultationLimits,
  honeypotTripped,
  isRateLimited,
  sameOrigin,
  submissionTiming,
  validateConsultation,
  type ConsultationErrorCode,
} from "@/lib/consultation";
import { sendConsultationEmail } from "@/lib/send-consultation";

export const runtime = "nodejs";

function error(code: ConsultationErrorCode, status: number) {
  return NextResponse.json({ ok: false, code }, { status });
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    console.error("Contact form rejected a request from another origin.");
    return error("send", 403);
  }

  if (isRateLimited(clientAddress(request))) {
    console.error("Contact form rate limit reached.");
    return error("rate", 429);
  }

  const advertisedLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(advertisedLength) && advertisedLength > consultationLimits.body) {
    return error("length", 413);
  }

  let payload: unknown;
  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      const raw = await request.text();
      if (raw.length > consultationLimits.body) return error("length", 413);
      payload = JSON.parse(raw);
    } else if (
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data")
    ) {
      const form = await request.formData();
      const record: Record<string, string> = {};
      for (const [key, value] of form.entries()) {
        if (typeof value !== "string") return error("validation", 400);
        record[key] = value;
      }
      payload = record;
    } else {
      return error("validation", 400);
    }
  } catch (err) {
    console.error("Contact form could not read the submission.", err);
    return error("validation", 400);
  }

  if (!payload || typeof payload !== "object") return error("validation", 400);
  const record = payload as Record<string, unknown>;

  if (honeypotTripped(record.gotcha)) {
    console.error("Contact form honeypot was filled. The submission was dropped.");
    return NextResponse.json({ ok: true });
  }

  const validated = validateConsultation(record);
  if (!validated.ok) return error(validated.code, validated.code === "length" ? 413 : 400);

  if (submissionTiming(record.startedAt) === "wait") return error("wait", 400);

  const sent = await sendConsultationEmail(validated.value);
  if (!sent.ok) return error("send", 502);

  return NextResponse.json({ ok: true });
}
