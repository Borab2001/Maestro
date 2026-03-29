import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Album | Maestro | Première troupe de pianistes de France",
  description: "Découvrez les albums de la troupe Maestro, la première troupe de pianistes de France.",
  openGraph: {
    title: "Albums | Maestro | Première troupe de pianistes de France",
    description: "Découvrez les albums de la troupe Maestro, la première troupe de pianistes de France.",
    url: "https://www.maestroconcerts.com/album",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Maestro Troupe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Albums | Maestro",
    description: "Découvrez les albums de la troupe Maestro, la première troupe de pianistes de France.",
    images: ["/og-image.png"],
  },
};

export default function AlbumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
