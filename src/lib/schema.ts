import { faqs, siteConfig } from "./site";

const { name, url, email, serviceArea, founder, description, tagline } =
  siteConfig;

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description: `${tagline} ${description}`,
    publisher: {
      "@type": "Organization",
      name,
      url,
      email,
    },
  };
}

export function professionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["AccountingService", "ProfessionalService", "LocalBusiness"],
    name,
    url,
    email,
    description: `${tagline} ${description}`,
    areaServed: serviceArea.cities.map((city) => ({
      "@type": "City",
      name: city,
      containedInPlace: {
        "@type": "State",
        name: "Alabama",
        addressCountry: "US",
      },
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tuscumbia",
      addressRegion: "AL",
      addressCountry: "US",
      // streetAddress / postalCode / telephone omitted until verified NAP exists
    },
    founder: {
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.jobTitle,
    },
    knowsAbout: [
      "Tax planning",
      "Real estate taxation",
      "Tax preparation",
      "Bookkeeping",
      "Virtual CFO",
      "Accounting system setup",
      "AI implementation for finance",
    ],
    priceRange: "$$",
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: founder.name,
    jobTitle: "Certified Public Accountant",
    description:
      "Licensed Alabama CPA (2022). Public accounting background with a focus on real estate taxation; Controller experience in the Florence area. Founder of Benford Consulting, LLC.",
    worksFor: {
      "@type": "Organization",
      name,
      url,
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "United States Air Force Academy",
    },
    knowsAbout: [
      "Certified Public Accountant",
      "Real estate taxation",
      "Tax planning",
      "Bookkeeping",
      "Financial stewardship",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tuscumbia",
      addressRegion: "AL",
      addressCountry: "US",
    },
    url: `${url}/about`,
    email,
  };
}

export function faqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${url}${item.path}`,
    })),
  };
}

export function articleJsonLd(post: {
  title: string;
  description: string;
  date: string;
  author: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      url: `${url}/about`,
    },
    publisher: {
      "@type": "Organization",
      name,
      url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${url}/blog/${post.slug}`,
    },
    url: `${url}/blog/${post.slug}`,
  };
}

