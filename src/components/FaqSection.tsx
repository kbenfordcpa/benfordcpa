import { faqs } from "@/lib/site";

type FaqSectionProps = {
  title?: string;
  intro?: string;
};

export function FaqSection({
  title = "Frequently asked questions",
  intro = "Clear answers for individuals and business owners considering a CPA in the Shoals area.",
}: FaqSectionProps) {
  return (
    <section
      className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8"
      aria-labelledby="faq-heading"
    >
      <h2
        id="faq-heading"
        className="font-serif text-3xl font-semibold text-navy sm:text-4xl"
      >
        {title}
      </h2>
      <p className="mt-3 text-charcoal/80">{intro}</p>
      <dl className="mt-10 space-y-6">
        {faqs.map((faq) => (
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
