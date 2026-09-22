/**
 * Site configuration for Benford Consulting, LLC
 * NAP: phone and street address are intentionally omitted until verified.
 * Do not invent contact details for schema or display.
 */

export const siteConfig = {
  name: "Benford Consulting, LLC",
  shortName: "Benford Consulting",
  tagline: "Faithful Stewardship. Sound Financial Guidance.",
  description:
    "Helping individuals and business owners manage their finances with wisdom, clarity, and integrity.",
  url: "https://www.benfordcpa.com",
  email: "kbenfordcpa@gmail.com",
  // phone: TBD — not published on live site; do not invent
  // streetAddress: TBD — not published on live site; do not invent
  serviceArea: {
    label: "Florence–Tuscumbia / Shoals, Alabama",
    cities: [
      "Florence",
      "Tuscumbia",
      "Muscle Shoals",
      "Sheffield",
      "Shoals",
    ] as const,
    region: "AL",
    country: "US",
  },
  founder: {
    name: "Kolby Benford",
    jobTitle: "CPA",
    credentials: "Licensed CPA in Alabama (2022)",
  },
  social: {
    // No public social profiles confirmed on live site — omit fake URLs
  },
  nav: [
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ] as const,
} as const;

export const services = [
  {
    slug: "tax-planning",
    title: "Tax Planning",
    subtitle: "Specializing in Real Estate Taxation",
    summary:
      "Proactive strategy to minimize your tax burden, with deep expertise in the unique rules around real estate investment and ownership.",
    whatItIs:
      "Year-round tax strategy that looks ahead of filing season — structuring ownership, timing income and expenses, and using available credits and deductions.",
    whoItsFor:
      "Individuals and business owners — especially those with rental properties, real estate investments, or complex returns — in the Florence–Tuscumbia / Shoals area and beyond.",
    outcome:
      "A clearer plan to reduce tax liability legally and avoid surprises at filing time.",
  },
  {
    slug: "virtual-cfo",
    title: "Virtual CFO",
    subtitle: "Strategic financial leadership",
    summary:
      "Strategic financial guidance and reporting for growing businesses, without the cost of a full-time hire.",
    whatItIs:
      "Fractional CFO support: cash-flow planning, financial reporting, KPI tracking, and decision support on a part-time or project basis.",
    whoItsFor:
      "Growing businesses in the Shoals and surrounding Alabama markets that need leadership-level finance insight without a full-time CFO salary.",
    outcome:
      "Better visibility into the numbers that drive growth, with guidance you can act on.",
  },
  {
    slug: "tax-preparation",
    title: "Tax Preparation",
    subtitle: "Personal and Business",
    summary:
      "Accurate, on-time filing you can trust — whether it’s your personal return, your business, or both working together.",
    whatItIs:
      "Professional preparation and filing of individual and business tax returns, coordinated so personal and entity returns align.",
    whoItsFor:
      "Individuals, families, and business owners who want reliable, compliant returns without the DIY stress.",
    outcome:
      "On-time filings you can stand behind, with fewer errors and clearer records for next year.",
  },
  {
    slug: "accounting-system-setup",
    title: "Accounting System Setup",
    subtitle: "Tools that fit how you operate",
    summary:
      "Clean implementation of the right accounting tools and processes, built to fit how your business actually runs.",
    whatItIs:
      "Selection, configuration, and go-live support for accounting software and chart-of-accounts design matched to your workflow.",
    whoItsFor:
      "New businesses, or established ones outgrowing spreadsheets or messy books.",
    outcome:
      "A system you can trust day to day — so reporting and tax prep start from clean data.",
  },
  {
    slug: "bookkeeping",
    title: "Bookkeeping",
    subtitle: "Clean, current books",
    summary:
      "Accurate, up-to-date records so you always know where your business stands financially.",
    whatItIs:
      "Ongoing recording of transactions, reconciliations, and organized financial statements on a monthly or custom cadence.",
    whoItsFor:
      "Business owners who need dependable books for decisions, lenders, and tax season — not just year-end catch-up.",
    outcome:
      "Current books you can read, share, and build tax and CFO work on top of.",
  },
  {
    slug: "ai-implementation",
    title: "AI Implementation",
    subtitle: "Practical tools for finance workflows",
    summary:
      "Practical AI tools built into your financial workflows to save time and improve accuracy.",
    whatItIs:
      "Hands-on help identifying where AI can safely speed up bookkeeping, reporting, or document workflows — without hype or risky shortcuts.",
    whoItsFor:
      "Owners and finance teams ready to automate repetitive work while keeping human oversight on compliance-sensitive tasks.",
    outcome:
      "Less busywork, tighter processes, and more time for the decisions that matter.",
  },
] as const;

export const faqs = [
  {
    question: "What services does Benford Consulting offer?",
    answer:
      "Benford Consulting provides tax planning (including real estate taxation), tax preparation for individuals and businesses, bookkeeping, accounting system setup, virtual CFO services, and practical AI implementation for financial workflows. The firm serves individuals and business owners in the Florence–Tuscumbia / Shoals, Alabama area.",
  },
  {
    question: "Where is Benford Consulting located?",
    answer:
      "Benford Consulting, LLC serves the Florence–Tuscumbia / Shoals region of Alabama, including Florence, Tuscumbia, Muscle Shoals, and surrounding communities. Consultations can be arranged by email.",
  },
  {
    question: "Is Kolby Benford a licensed CPA?",
    answer:
      "Yes. Kolby Benford is a licensed Certified Public Accountant in Alabama, earning his CPA certification in 2022. He has a background in public accounting and has served as Controller for an insurance agency in the Florence area.",
  },
  {
    question: "Do you specialize in real estate taxation?",
    answer:
      "Yes. Tax planning at Benford Consulting specializes in real estate taxation — helping investors and owners navigate the rules around rental property, ownership structures, and related tax strategy.",
  },
  {
    question: "Who is a good fit for virtual CFO services?",
    answer:
      "Growing businesses that need strategic financial guidance, reporting, and decision support without hiring a full-time CFO. Virtual CFO work complements bookkeeping and tax services so owners have both clean books and forward-looking advice.",
  },
  {
    question: "How do I request a consultation?",
    answer:
      "Use the contact form on this website or email kbenfordcpa@gmail.com. Share a brief note about whether you need tax, bookkeeping, virtual CFO, or another service, and Benford Consulting will follow up to schedule a discussion.",
  },
  {
    question: "What does “faithful stewardship” mean for clients?",
    answer:
      "It reflects the firm’s conviction that finances, time, and talents are meant to be managed with wisdom, clarity, and integrity. Clients can expect professional CPA guidance grounded in that stewardship mindset — practical advice, not pressure sales.",
  },
] as const;

export const scriptureQuote = {
  text: "Whoever can be trusted with very little can also be trusted with much.",
  citation: "Luke 16:10",
} as const;
