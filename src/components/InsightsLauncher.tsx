"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { NewsletterSignup } from "@/components/NewsletterSignup";

/**
 * Fixed “Weekly insights” control. It steps aside when the footer or blog
 * signup is on screen, and when it would cover a link or form control.
 * It does not animate.
 */
export function InsightsLauncher() {
  const pathname = usePathname();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [nearSignup, setNearSignup] = useState(false);
  const [coveringControl, setCoveringControl] = useState(false);
  const suppressed = nearSignup || coveringControl;
  const spotRef = useRef({ w: 125, h: 40, right: 24, bottom: 24 });

  useEffect(() => {
    const targets = document.querySelectorAll(
      "footer, form[data-variant='panel']",
    );
    if (targets.length === 0) return;

    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setNearSignup(visible.size > 0);
      },
      { rootMargin: "0px 0px 72px 0px", threshold: 0 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const controls = document.querySelectorAll(
      "main a[href], main button, main input, main textarea, main select",
    );

    const hotspot = () => {
      const button = launcherRef.current;
      if (button && !button.hidden) {
        const rect = button.getBoundingClientRect();
        spotRef.current = {
          w: rect.width,
          h: rect.height,
          right: window.innerWidth - rect.right,
          bottom: window.innerHeight - rect.bottom,
        };
        return rect;
      }
      const { w, h, right, bottom } = spotRef.current;
      return {
        left: window.innerWidth - right - w,
        right: window.innerWidth - right,
        top: window.innerHeight - bottom - h,
        bottom: window.innerHeight - bottom,
      };
    };

    let frame = 0;
    const check = () => {
      frame = 0;
      const spot = hotspot();
      const pad = 4;
      let hit = false;
      for (const control of controls) {
        const rect = control.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;
        if (
          spot.left - pad < rect.right &&
          spot.right + pad > rect.left &&
          spot.top - pad < rect.bottom &&
          spot.bottom + pad > rect.top
        ) {
          hit = true;
          break;
        }
      }
      setCoveringControl(hit);
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(check);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    if (!dialog.open) dialog.showModal();

    const onClick = (event: MouseEvent) => {
      const rect = dialog.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      if (!inside) dialog.close();
    };

    dialog.addEventListener("click", onClick);
    return () => dialog.removeEventListener("click", onClick);
  }, [open]);

  function closeDialog() {
    setOpen(false);
    launcherRef.current?.focus();
  }

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        hidden={suppressed || undefined}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="weekly-insights-dialog"
        onClick={() => setOpen(true)}
        className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-cream shadow-md ring-1 ring-gold/50 transition-colors motion-reduce:transition-none hover:bg-navy-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:right-6 sm:bottom-6"
      >
        Weekly insights
      </button>

      {open ? (
        <dialog
          ref={dialogRef}
          id="weekly-insights-dialog"
          aria-labelledby={titleId}
          onClose={closeDialog}
          className="m-auto w-[min(100%-2rem,28rem)] max-h-[min(100%-2rem,40rem)] overflow-y-auto rounded-xl border border-navy/15 bg-white p-6 text-charcoal shadow-lg backdrop:bg-navy/55 sm:p-8"
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="rounded-md px-2 py-1 text-sm font-semibold text-navy underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              Close
            </button>
          </div>
          <NewsletterSignup variant="plain" headingId={titleId} />
        </dialog>
      ) : null}
    </>
  );
}
