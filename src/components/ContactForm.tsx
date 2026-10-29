"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { consultationInterests, isEmailAddress } from "@/lib/consultation";
import { siteConfig } from "@/lib/site";

const fieldClass =
  "mt-1 w-full rounded-md border border-navy/20 bg-cream px-3 py-2 text-charcoal shadow-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40";

type Status = "idle" | "sending" | "success" | "error";

function ErrorNotice({ code }: { code: string }) {
  if (code === "validation") {
    return (
      <p className="text-sm text-red-700" role="alert">
        Please fill in your name, email, and message.
      </p>
    );
  }
  if (code === "email") {
    return (
      <p className="text-sm text-red-700" role="alert">
        Please enter a valid email address.
      </p>
    );
  }
  if (code === "phone") {
    return (
      <p className="text-sm text-red-700" role="alert">
        Please enter a valid phone number, or leave it blank.
      </p>
    );
  }
  if (code === "interest") {
    return (
      <p className="text-sm text-red-700" role="alert">
        Please choose a service from the list.
      </p>
    );
  }
  if (code === "wait") {
    return (
      <p className="text-sm text-red-700" role="alert">
        Please wait a moment and try again.
      </p>
    );
  }

  const lead =
    code === "rate"
      ? "Please wait a few minutes and try again, or email"
      : code === "length"
        ? "That message is too long. Please shorten it, or email"
        : "We couldn't send your request. Please email";

  return (
    <p className="text-sm text-red-700" role="alert">
      {lead}{" "}
      <a className="underline" href={`mailto:${siteConfig.email}`}>
        {siteConfig.email}
      </a>{" "}
      directly.
    </p>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorCode, setErrorCode] = useState("validation");
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const interest = String(data.get("interest") || "").trim();
    const message = String(data.get("message") || "").trim();
    const gotcha = String(data.get("gotcha") || "");

    if (!name || !email || !message) {
      setErrorCode("validation");
      setStatus("error");
      return;
    }
    if (!isEmailAddress(email)) {
      setErrorCode("email");
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          interest,
          message,
          gotcha,
          startedAt: startedAt.current ?? 0,
        }),
      });
      const body = (await response.json().catch(() => null)) as {
        ok?: boolean;
        code?: string;
      } | null;
      if (!response.ok || !body?.ok) {
        setErrorCode(body?.code || "send");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorCode("send");
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative space-y-5 rounded-xl border border-navy/10 bg-white p-6 shadow-sm sm:p-8"
      noValidate
      aria-busy={status === "sending"}
    >
      <div aria-hidden="true" className="absolute top-0 left-0 -z-10 h-px w-px overflow-hidden opacity-0">
        <label htmlFor="gotcha">Company website</label>
        <input
          id="gotcha"
          name="gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

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
          maxLength={100}
          className={fieldClass}
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
          maxLength={254}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-navy">
          Phone (optional)
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={40}
          className={fieldClass}
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
          className={fieldClass}
        >
          <option value="" disabled>
            Select a service…
          </option>
          {consultationInterests.map((item) => (
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
          maxLength={5000}
          placeholder="Tell us a bit about your tax, bookkeeping, or financial guidance needs…"
          className={fieldClass}
        />
      </div>

      {status === "error" && <ErrorNotice code={errorCode} />}
      {status === "success" && (
        <p className="text-sm text-navy" role="status">
          Thank you. Your consultation request has been sent. We’ll follow up
          by email.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending" || status === "success"}
        className="w-full rounded-md bg-navy px-4 py-3 text-sm font-semibold text-cream transition-colors hover:bg-navy-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "sending"
          ? "Sending…"
          : status === "success"
            ? "Request sent"
            : "Request consultation"}
      </button>
    </form>
  );
}
