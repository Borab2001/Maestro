import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concerts | Maestro | Première troupe de pianistes de France",
  description: "Découvrez les concerts et performances de la troupe Maestro, la première troupe de pianistes de France.",
  openGraph: {
    title: "Concerts | Maestro | Première troupe de pianistes de France",
    description: "Découvrez les concerts et performances de la troupe Maestro, la première troupe de pianistes de France.",
    url: "https://www.maestroconcerts.com/concerts",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Maestro Concerts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Concerts | Maestro",
    description: "Découvrez les concerts et performances de la troupe Maestro, la première troupe de pianistes de France.",
    images: ["/og-image.png"],
  },
};

export default function ConcertsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
