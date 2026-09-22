import Link from "next/link";

type CtaBannerProps = {
  title?: string;
  body?: string;
};

export function CtaBanner({
  title = "Ready to talk about your finances?",
  body = "Whether you need tax planning, bookkeeping, virtual CFO support, or a clearer system — request a consultation. Serving individuals and business owners across Florence, Tuscumbia, and the Shoals.",
}: CtaBannerProps) {
  return (
    <section className="bg-navy">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-serif text-2xl font-semibold text-cream sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-cream/80">{body}</p>
        </div>
        <Link
          href="/contact"
          className="shrink-0 rounded-md bg-gold px-5 py-3 text-sm font-semibold text-navy shadow-sm transition-colors hover:bg-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
        >
          Contact Benford Consulting
        </Link>
      </div>
    </section>
  );
}
