import type { Metadata } from "next";
import { Libre_Baskerville, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import {
  professionalServiceJsonLd,
  websiteJsonLd,
} from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "CPA in Florence & Tuscumbia, AL | Benford Consulting",
    template: "%s | Benford Consulting",
  },
  description:
    "Alabama CPA helping individuals and business owners with tax, bookkeeping, and financial guidance across the Florence–Tuscumbia / Shoals area. Faithful stewardship. Sound advice.",
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.founder.name, url: `${siteConfig.url}/about` }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    "CPA Florence AL",
    "CPA Tuscumbia",
    "Shoals CPA",
    "Alabama CPA",
    "tax planning Florence",
    "bookkeeping Muscle Shoals",
    "virtual CFO Alabama",
    "real estate tax CPA",
    "Benford Consulting",
    "Kolby Benford CPA",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "CPA in Florence & Tuscumbia, AL | Benford Consulting",
    description:
      "Alabama CPA helping individuals and business owners with tax, bookkeeping, and financial guidance across the Florence–Tuscumbia / Shoals area.",
    images: [
      {
        url: "/og-default.svg",
        width: 1200,
        height: 630,
        alt: "Benford Consulting — Faithful Stewardship. Sound Financial Guidance.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CPA in Florence & Tuscumbia, AL | Benford Consulting",
    description:
      "Tax, bookkeeping, and financial guidance for the Florence–Tuscumbia / Shoals, Alabama area.",
    images: ["/og-default.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${libreBaskerville.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <JsonLd data={websiteJsonLd()} />
        <JsonLd data={professionalServiceJsonLd()} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:text-navy"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
