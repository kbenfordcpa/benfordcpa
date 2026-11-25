import { faqs as defaultFaqs } from "@/lib/site";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  title?: string;
  intro?: string | null;
  items?: readonly FaqItem[];
  embedded?: boolean;
};

export function FaqSection({
  title = "Frequently asked questions",
  intro = "Clear answers for individuals and business owners considering a CPA in Florence, Alabama.",
  items = defaultFaqs,
  embedded = false,
}: FaqSectionProps) {
  const headingId = embedded
    ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    : "faq-heading";

  return (
    <section
      className={
        embedded
          ? "mt-12"
          : "mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8"
      }
      aria-labelledby={headingId}
    >
      <h2
        id={headingId}
        className={
          embedded
            ? "font-serif text-2xl font-semibold text-navy"
            : "font-serif text-3xl font-semibold text-navy sm:text-4xl"
        }
      >
        {title}
      </h2>
      {intro ? <p className="mt-3 text-charcoal/80">{intro}</p> : null}
      <dl className={embedded ? "mt-6 space-y-6" : "mt-10 space-y-6"}>
        {items.map((faq) => (
          <div
            key={faq.question}
            className="rounded-lg border border-navy/10 bg-white p-5 shadow-sm"
          >
            <dt className="font-serif text-lg font-semibold text-navy">
              {faq.question}
            </dt>
            <dd className="mt-2 text-charcoal/85 leading-relaxed">
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
