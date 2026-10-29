import { Resend } from "resend";
import {
  buildConsultationMessage,
  isMailbox,
  type ConsultationSubmission,
} from "@/lib/consultation";

const defaultToEmail = "kolby@benfordcpa.com";

function contactRecipient(): string {
  return process.env.CONTACT_TO_EMAIL?.trim() || defaultToEmail;
}

function contactSender(): string | null {
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!from || !isMailbox(from)) return null;
  return from;
}

export async function sendConsultationEmail(
  value: ConsultationSubmission,
): Promise<{ ok: true } | { ok: false }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = contactSender();
  const to = contactRecipient();

  if (!apiKey || !from || !isMailbox(to)) {
    console.error(
      "Contact form email is not configured. Set RESEND_API_KEY and CONTACT_FROM_EMAIL.",
    );
    return { ok: false };
  }

  const message = buildConsultationMessage(value);
  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to,
    replyTo: value.email,
    subject: message.subject,
    text: message.text,
  });

  if (result.error) {
    console.error(
      "Contact form email failed.",
      result.error.name,
      result.error.message,
    );
    return { ok: false };
  }

  return { ok: true };
}
