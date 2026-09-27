"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useId, useRef } from "react";

const KIT_FORM_ID = "9968410";
const KIT_UID = "34c5e2894b";
const KIT_ACTION = "https://app.kit.com/forms/9968410/subscriptions";
const KIT_SCRIPT_SRC = "https://f.convertkit.com/ckjs/ck.5.js";

/** Kit’s configured double opt-in confirmation. */
const KIT_OPTIONS = JSON.stringify({
  settings: {
    after_subscribe: {
      action: "message",
      success_message:
        "Success! Now check your email to confirm your subscription.",
      redirect_url: "",
    },
    recaptcha: { enabled: false },
    return_visitor: { action: "show", custom_content: "" },
  },
  version: "5",
});

type KitTrackedForm = { element: HTMLFormElement };

type NewsletterSignupProps = {
  variant?: "footer" | "panel";
  className?: string;
};

function trackedForms(): KitTrackedForm[] | undefined {
  return (window as Window & { __sv_forms?: KitTrackedForm[] }).__sv_forms;
}

function isTracked(form: HTMLFormElement): boolean {
  return trackedForms()?.some((entry) => entry.element === form) ?? false;
}

/**
 * ck.js binds [data-sv-form] once. Re-running it picks up forms that mount
 * after a client navigation; already-initialized forms are left alone.
 */
let kitReload: Promise<void> | null = null;

function reloadKitScript(): Promise<void> {
  if (kitReload) return kitReload;
  kitReload = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = KIT_SCRIPT_SRC;
    script.async = true;
    const finish = () => {
      script.remove();
      kitReload = null;
      resolve();
    };
    script.onload = finish;
    script.onerror = finish;
    document.body.appendChild(script);
  });
  return kitReload;
}

export function NewsletterSignup({
  variant = "panel",
  className,
}: NewsletterSignupProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const reactId = useId();
  const headingId = `${reactId}-heading`;
  const emailId = `${reactId}-email`;
  const nameId = `${reactId}-first-name`;
  const isFooter = variant === "footer";

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    let cancelled = false;

    const releaseSuccessId = () => {
      const success = form.querySelector<HTMLElement>("[data-element='success']");
      if (success?.id === KIT_UID) success.removeAttribute("id");
    };

    const observer = new MutationObserver(releaseSuccessId);
    observer.observe(form, { childList: true, subtree: true });

    const interval = window.setInterval(() => {
      if (cancelled || !formRef.current) return;
      if (isTracked(formRef.current)) {
        window.clearInterval(interval);
        return;
      }
      if (!trackedForms()) return;
      void reloadKitScript();
    }, 400);

    const stop = window.setTimeout(() => window.clearInterval(interval), 8000);

    return () => {
      cancelled = true;
      observer.disconnect();
      window.clearInterval(interval);
      window.clearTimeout(stop);
    };
  }, []);

  const labelClass = isFooter
    ? "block text-sm font-medium text-cream/90"
    : "block text-sm font-medium text-navy";
  const fieldClass = isFooter
    ? "mt-1 w-full rounded-md border border-cream/25 bg-cream px-3 py-2 text-sm text-charcoal shadow-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
    : "mt-1 w-full rounded-md border border-navy/20 bg-cream px-3 py-2 text-charcoal shadow-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40";
  const buttonClass = isFooter
    ? "inline-flex w-full items-center justify-center rounded-md bg-gold px-4 py-2 text-sm font-semibold text-navy shadow-sm transition-colors hover:bg-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream disabled:opacity-70"
    : "inline-flex w-full items-center justify-center rounded-md bg-navy px-4 py-3 text-sm font-semibold text-cream transition-colors hover:bg-navy-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-70 sm:w-auto";
  const privacyClass = isFooter
    ? "mt-3 text-xs leading-relaxed text-cream/65"
    : "mt-3 text-xs leading-relaxed text-charcoal/70";
  const privacyLinkClass = isFooter
    ? "font-medium text-cream underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    : "font-medium text-navy underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

  const sectionClass = [
    isFooter
      ? undefined
      : "rounded-xl border border-navy/10 bg-white p-6 shadow-sm sm:p-8",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      aria-labelledby={headingId}
      className={sectionClass || undefined}
    >
      <Script src={KIT_SCRIPT_SRC} strategy="afterInteractive" />
      <div className={isFooter ? "md:flex md:items-end md:justify-between md:gap-10" : undefined}>
        <div className={isFooter ? "md:max-w-md md:shrink-0" : undefined}>
          <h2
            id={headingId}
            className={
              isFooter
                ? "font-serif text-xl font-semibold text-cream"
                : "font-serif text-2xl font-semibold text-navy"
            }
          >
            Weekly insights
          </h2>
          <p
            className={
              isFooter
                ? "mt-2 text-sm leading-relaxed text-cream/80"
                : "mt-3 leading-relaxed text-charcoal/85"
            }
          >
            Practical tax and finance notes for business owners in the Shoals
            area. One email when we publish—unsubscribe anytime.
          </p>
        </div>

        <form
          ref={formRef}
          action={KIT_ACTION}
          method="post"
          data-sv-form={KIT_FORM_ID}
          data-uid={KIT_UID}
          data-format="inline"
          data-version="5"
          data-options={KIT_OPTIONS}
          data-variant={variant}
          className={`newsletter-signup formkit-form ${isFooter ? "mt-4 md:mt-0 md:min-w-0 md:flex-1" : "mt-5"}`}
        >
          <ul
            data-element="errors"
            data-group="alert"
            aria-live="polite"
            className="empty:hidden mb-3 list-none space-y-1 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800"
          />
          <div
            data-element="fields"
            className={
              isFooter
                ? "grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-end"
                : "grid gap-4"
            }
          >
            <div className={isFooter ? "sm:col-span-1" : undefined}>
              <label htmlFor={emailId} className={labelClass}>
                Email <span className={isFooter ? "text-gold" : "text-red-700"}>*</span>
              </label>
              <input
                id={emailId}
                name="email_address"
                type="email"
                autoComplete="email"
                required
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor={nameId} className={labelClass}>
                First name{" "}
                <span className={isFooter ? "font-normal text-cream/60" : "font-normal text-charcoal/60"}>
                  (optional)
                </span>
              </label>
              <input
                id={nameId}
                name="fields[first_name]"
                type="text"
                autoComplete="given-name"
                className={fieldClass}
              />
            </div>
            <button
              type="submit"
              data-element="submit"
              className={
                isFooter ? `${buttonClass} sm:col-span-2 lg:col-span-1` : buttonClass
              }
            >
              Subscribe
            </button>
          </div>
          <p className={privacyClass}>
            We use Kit to send email. See our{" "}
            <Link href="/privacy" className={privacyLinkClass}>
              Privacy Policy
            </Link>
            .
          </p>
        </form>
      </div>
    </section>
  );
}
