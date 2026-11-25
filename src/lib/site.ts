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
  email: "kolby@benfordcpa.com",
  // phone: TBD — not published on live site; do not invent
  // streetAddress: TBD — not published on live site; do not invent
  serviceArea: {
    label: "Florence, Alabama",
    cities: [
      "Florence",
      "Tuscumbia",
      "Muscle Shoals",
      "Sheffield",
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
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ] as const,
  clientPortal: {
    label: "Client Portal",
    href: "https://app.financial-cents.com/client-portal",
  } as const,
} as const;

export const services = [
  {
    slug: "tax-planning",
    title: "Tax Planning",
    seoDescription:
      "Proactive tax planning to minimize your tax burden, with deep expertise in real estate investment and ownership. Serving Florence, AL.",
    subtitle: "Specializing in Real Estate Taxation",
    summary:
      "Proactive strategy to minimize your tax burden, with deep expertise in the unique rules around real estate investment and ownership.",
    whatItIs:
      "Year-round tax strategy that looks ahead of filing season — structuring ownership, timing income and expenses, and using available credits and deductions.",
    whoItsFor:
      "Individuals and business owners — especially those with rental properties, real estate investments, or complex returns — in Florence, Alabama and beyond.",
    outcome:
      "A clearer plan to reduce tax liability legally and avoid surprises at filing time.",
    howItWorks: [
      "Review your ownership structures, income sources, and real estate holdings.",
      "Map year-round moves — timing, credits, and deductions — before filing season.",
      "Leave you with a written plan you can act on and revisit as life changes.",
    ],
    detailParagraph:
      "Tax planning at Benford Consulting is year-round strategy, not a once-a-year scramble. With a focus on real estate taxation, Kolby helps investors and owners in Florence structure ownership, time income and expenses, and use available credits so filing season brings fewer surprises.",
  },
  {
    slug: "virtual-cfo",
    title: "Virtual CFO",
    seoTitle: "Virtual CFO Services for Florence, AL Business Owners",
    seoDescription:
      "Part-time CFO help for Florence, AL business owners: cash-flow forecasts, monthly reporting, and KPIs, without the cost of a full-time hire.",
    subtitle: "Strategic financial leadership",
    summary:
      "Strategic financial guidance and reporting for growing businesses, without the cost of a full-time hire.",
    whatItIs:
      "Fractional CFO support: cash-flow planning, financial reporting, KPI tracking, and decision support on a part-time or project basis.",
    whoItsFor:
      "Growing businesses in Florence and surrounding Alabama markets that need leadership-level finance insight without a full-time CFO salary.",
    outcome:
      "Better visibility into the numbers that drive growth, with guidance you can act on.",
    howItWorks: [
      "Clarify the decisions and reports that matter most for your stage of growth.",
      "Build cash-flow, KPI, and reporting rhythms on a part-time or project cadence.",
      "Advise alongside your books so strategy stays grounded in clean numbers.",
    ],
    detailParagraph:
      "Virtual CFO support gives business owners in Florence, AL leadership-level finance insight — cash-flow planning, reporting, and KPI tracking — without a full-time hire. It pairs naturally with bookkeeping and tax work so owners have both clean books and forward-looking advice.",
    extraSections: [
      {
        heading: "Signs it's time for a virtual CFO",
        intro:
          "Many business owners start looking for CFO-level help when one or more of these sounds familiar:",
        bullets: [
          {
            text: "You're profitable on paper but cash still feels tight from month to month.",
          },
          {
            text: "You're weighing a big decision, such as hiring, buying equipment, or taking on debt, and want to see the numbers first.",
          },
          {
            text: "Your books are current, but nobody turns them into reports you actually use.",
          },
          {
            text: "Your lender, investors, or partners are asking for forecasts or regular financial reporting.",
          },
          {
            text: "You need more than tax season help, but not a full-time CFO salary.",
          },
        ],
      },
      {
        heading: "What the work can include",
        bullets: [
          {
            text: "Cash-flow forecasting so you can see tight months coming and plan for them.",
          },
          {
            text: "Monthly or quarterly reporting in plain English, with the few KPIs that matter for your business.",
          },
          {
            text: "Budgeting and planning for the year ahead, tied to your tax planning.",
          },
          {
            text: "Decision support on pricing, hiring, financing, and major purchases.",
          },
        ],
        closing:
          'Proverbs 27:23 says, "Know well the condition of your flocks, and give attention to your herds" (ESV). For a business owner, that means knowing your numbers well enough to make sound decisions. Faithful stewardship starts with clear, current information.',
      },
    ],
    faqs: [
      {
        question:
          "What's the difference between a bookkeeper and a virtual CFO?",
        answer:
          "A bookkeeper keeps your records accurate and current. A virtual CFO uses those records to forecast, report, and advise on decisions. Many business owners need both, and the two work best together.",
      },
      {
        question: "Do my books need to be clean first?",
        answer:
          "Advice is only as good as the numbers behind it. If your books are behind, the first step is usually bookkeeping cleanup, then CFO-level reporting builds on top of it.",
      },
      {
        question: "Is a virtual CFO only for large businesses?",
        answer:
          "No. Virtual CFO support is built for small and growing businesses that need leadership-level financial insight on a part-time or project basis, without the cost of a full-time hire.",
      },
    ],
    relatedServiceLinks: [
      { href: "/services/bookkeeping", label: "Bookkeeping" },
      { href: "/services/tax-planning", label: "Tax Planning" },
      {
        href: "/services/accounting-system-setup",
        label: "Accounting System Setup",
      },
    ],
    relatedReading: [
      {
        href: "/blog/what-a-virtual-cfo-actually-does-for-growing-shoals-businesses",
        label:
          "What a Virtual CFO Actually Does for Growing Florence Businesses",
      },
      {
        href: "/blog/tax-prep-vs-tax-planning-before-year-end-florence",
        label: "Tax Prep vs. Tax Planning",
      },
      {
        href: "/blog/starting-2027-clean-books-accounting-system-florence",
        label: "Starting 2027 on Clean Books",
      },
    ],
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
    howItWorks: [
      "Gather personal and business documents and clarify filing goals.",
      "Prepare and coordinate returns so individual and entity filings align.",
      "File on time and leave clearer records for next year’s planning.",
    ],
    detailParagraph:
      "Tax preparation covers individual and business returns with care so personal and entity filings work together. Clients in Florence get on-time, compliant filings without DIY stress — and cleaner records for the year ahead.",
  },
  {
    slug: "accounting-system-setup",
    title: "Accounting System Setup",
    seoTitle: "Accounting System Setup in Florence, AL | Benford Consulting",
    subtitle: "Tools that fit how you operate",
    summary:
      "Clean implementation of the right accounting tools and processes, built to fit how your business actually runs.",
    whatItIs:
      "Selection, configuration, and go-live support for accounting software and chart-of-accounts design matched to your workflow.",
    whoItsFor:
      "New businesses, or established ones outgrowing spreadsheets or messy books.",
    outcome:
      "A system you can trust day to day — so reporting and tax prep start from clean data.",
    howItWorks: [
      "Learn how your business actually runs — not a one-size-fits-all chart.",
      "Select, configure, and design accounts matched to your workflow.",
      "Support go-live so reporting and tax prep start from clean data.",
    ],
    detailParagraph:
      "Accounting system setup means selecting and configuring tools that match how your business operates — including chart-of-accounts design and go-live support. Ideal for new businesses in Florence or established ones outgrowing spreadsheets or messy books.",
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
    howItWorks: [
      "Set a monthly or custom cadence for transactions and reconciliations.",
      "Keep statements organized so you can read and share them anytime.",
      "Hand off clean books that tax prep and virtual CFO work can build on.",
    ],
    detailParagraph:
      "Bookkeeping keeps transactions recorded, accounts reconciled, and statements organized on a monthly or custom cadence. Florence business owners get dependable books for decisions, lenders, and tax season — not just year-end catch-up.",
  },
  {
    slug: "ai-implementation",
    title: "AI Implementation",
    seoTitle: "AI for Bookkeeping & Reporting | CPA in Florence, AL",
    seoDescription:
      "Practical AI help for Florence, AL business owners: faster bookkeeping, reporting, and document work, with CPA review kept on what matters.",
    subtitle: "Practical tools for finance workflows",
    summary:
      "Practical AI tools built into your financial workflows to save time and improve accuracy.",
    whatItIs:
      "Hands-on help identifying where AI can safely speed up bookkeeping, reporting, or document workflows — without hype or risky shortcuts.",
    whoItsFor:
      "Owners and finance teams ready to automate repetitive work while keeping human oversight on compliance-sensitive tasks.",
    outcome:
      "Less busywork, tighter processes, and more time for the decisions that matter.",
    howItWorks: [
      "Identify repetitive bookkeeping, reporting, or document steps worth automating.",
      "Implement practical AI tools with human oversight on compliance-sensitive work.",
      "Tighten processes so you spend less time on busywork and more on decisions.",
    ],
    detailParagraph:
      "AI implementation focuses on practical tools in financial workflows — speeding bookkeeping, reporting, or document work without hype or risky shortcuts. Owners keep human oversight on compliance-sensitive tasks while cutting repetitive busywork.",
    extraSections: [
      {
        heading: "Where AI can help",
        intro:
          "For most business owners, the best place to start with AI is the repetitive financial work that eats up hours each month. Examples:",
        bullets: [
          {
            label: "Bookkeeping",
            text: "suggesting categories for routine transactions and flagging items that look out of place, so a person reviews the exceptions instead of every line.",
          },
          {
            label: "Documents",
            text: "pulling key details from receipts, bills, and statements so they don't have to be typed in by hand.",
          },
          {
            label: "Reporting",
            text: "drafting a plain-English summary of the month's numbers that you or your bookkeeper then review and edit.",
          },
          {
            label: "Process cleanup",
            text: "documenting your month-end steps so the routine parts can be automated and the judgment calls stay with people.",
          },
        ],
      },
      {
        heading: "What stays human",
        intro:
          "AI is a tool, not a replacement for judgment. Tax positions, compliance filings, and final financial reports are always reviewed by a person. We also look at where your data goes before a tool is used, so client and financial information is handled responsibly. Faithful stewardship applies to your time and to your information.",
      },
    ],
    faqs: [
      {
        question: "Is AI safe to use with my financial data?",
        answer:
          "It can be, when the tool is chosen carefully and access is limited to what it needs. Part of this service is reviewing where your data goes before anything is set up.",
      },
      {
        question: "Do I need to change accounting software to use AI?",
        answer:
          "Not necessarily. Many improvements work with the system you already have. If your current setup is holding you back, that is where accounting system setup comes in.",
      },
      {
        question: "Will AI replace my bookkeeper or CPA?",
        answer:
          "No. The goal is to cut repetitive busywork so the people involved can spend more time on review, planning, and decisions.",
      },
    ],
    relatedServiceLinks: [
      { href: "/services/bookkeeping", label: "Bookkeeping" },
      {
        href: "/services/accounting-system-setup",
        label: "Accounting System Setup",
      },
      { href: "/services/virtual-cfo", label: "Virtual CFO" },
    ],
    relatedReading: [
      {
        href: "/blog/starting-2027-clean-books-accounting-system-florence",
        label: "Starting 2027 on Clean Books",
      },
      {
        href: "/blog/year-end-bookkeeping-checklist-business-owners-florence",
        label: "Year-End Bookkeeping Checklist for Business Owners",
      },
    ],
  },
] as const;

export type Service = (typeof services)[number];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const faqs = [
  {
    question: "What services does Benford Consulting offer?",
    answer:
      "Benford Consulting provides tax planning (including real estate taxation), tax preparation for individuals and businesses, bookkeeping, accounting system setup, virtual CFO services, and practical AI implementation for financial workflows. The firm serves individuals and business owners in Florence, Alabama.",
  },
  {
    question: "Where is Benford Consulting located?",
    answer:
      "Benford Consulting, LLC serves Florence, Alabama. Consultations can be arranged by email.",
  },
  {
    question: "Is Kolby Benford a licensed CPA?",
    answer:
      "Yes. Kolby Benford is a licensed Certified Public Accountant in Alabama, earning his CPA certification in 2022. He has a background in public accounting and has served as Controller for an insurance agency in Florence.",
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
      "Use the contact form on this website or email kolby@benfordcpa.com. Share a brief note about whether you need tax, bookkeeping, virtual CFO, or another service, and Benford Consulting will follow up to schedule a discussion.",
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
