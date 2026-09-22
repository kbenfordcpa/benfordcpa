"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/site";

const interests = [
  "Tax Planning",
  "Tax Preparation",
  "Bookkeeping",
  "Virtual CFO",
  "Accounting System Setup",
  "AI Implementation",
  "General inquiry",
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "ready" | "error">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const interest = String(data.get("interest") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      setStatus("error");
      return;
    }

    const subject = encodeURIComponent(
      `Consultation request — ${interest || "General"} — ${name}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Interest: ${interest || "Not specified"}`,
        "",
        "Message:",
        message,
        "",
        "---",
        "Sent via benfordcpa.com contact form (mailto). Server-side form wiring comes next.",
      ].join("\n"),
    );

    setStatus("ready");
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border border-navy/10 bg-white p-6 shadow-sm sm:p-8"
      noValidate
    >
      <p className="text-sm text-charcoal/70">
        This form opens your email client with a pre-filled message to{" "}
        <strong>{siteConfig.email}</strong>. Server-side form wiring comes next —
        nothing is posted to a backend yet.
      </p>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-navy">
          Full name <span className="text-red-700">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className="mt-1 w-full rounded-md border border-navy/20 bg-cream px-3 py-2 text-charcoal shadow-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-navy">
          Email <span className="text-red-700">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-1 w-full rounded-md border border-navy/20 bg-cream px-3 py-2 text-charcoal shadow-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
        />
      </div>

      <div>
        <label htmlFor="interest" className="block text-sm font-medium text-navy">
          How can we help?
        </label>
        <select
          id="interest"
          name="interest"
          defaultValue=""
          className="mt-1 w-full rounded-md border border-navy/20 bg-cream px-3 py-2 text-charcoal shadow-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
        >
          <option value="" disabled>
            Select a service…
          </option>
          {interests.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-navy">
          Message <span className="text-red-700">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us a bit about your tax, bookkeeping, or financial guidance needs…"
          className="mt-1 w-full rounded-md border border-navy/20 bg-cream px-3 py-2 text-charcoal shadow-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-700" role="alert">
          Please fill in your name, email, and message.
        </p>
      )}
      {status === "ready" && (
        <p className="text-sm text-navy" role="status">
          Opening your email client… If nothing opens, email{" "}
          <a
            className="underline"
            href={`mailto:${siteConfig.email}`}
          >
            {siteConfig.email}
          </a>{" "}
          directly.
        </p>
      )}

      <button
        type="submit"
        className="w-full rounded-md bg-navy px-4 py-3 text-sm font-semibold text-cream transition-colors hover:bg-navy-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:w-auto"
      >
        Open email to request consultation
      </button>
    </form>
  );
}
