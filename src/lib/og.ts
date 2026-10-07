import type { Metadata } from "next";

/**
 * Default social preview image. SVG is not accepted by most link-preview
 * crawlers, so metadata points at this PNG.
 *
 * Next.js shallow-merges `openGraph`: a page that sets `openGraph` replaces
 * the layout object, including images. Pass page fields through
 * `openGraphWithDefault`. To use a different image, pass `images`.
 */
export const defaultOgImage = {
  url: "/og-default.png",
  width: 1200,
  height: 630,
  alt: "Benford Consulting — Faithful Stewardship. Sound Financial Guidance.",
} as const;

type OpenGraph = NonNullable<Metadata["openGraph"]>;

export function openGraphWithDefault(
  openGraph: OpenGraph,
): OpenGraph {
  return {
    images: [defaultOgImage],
    ...openGraph,
  };
}
