import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artistes | Maestro | Première troupe de pianistes de France",
  description: "Découvrez les artistes talentueux de la troupe Maestro, la première troupe de pianistes de France.",
  openGraph: {
    title: "Artistes | Maestro | Première troupe de pianistes de France",
    description: "Découvrez les artistes talentueux de la troupe Maestro, la première troupe de pianistes de France.",
    url: "https://www.maestroconcerts.com/artists",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Maestro Concerts Artists",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artistes | Maestro",
    description: "Découvrez les artistes talentueux de la troupe Maestro, la première troupe de pianistes de France.",
    images: ["/og-image.png"],
  },
};

export default function ArtistsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
