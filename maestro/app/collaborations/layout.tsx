import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collaborations | Maestro | Première troupe de pianistes de France",
  description: "Explorez les collaborations de la troupe Maestro, la première troupe de pianistes de France.",
  openGraph: {
    title: "Collaborations | Maestro | Première troupe de pianistes de France",
    description: "Explorez les collaborations de la troupe Maestro, la première troupe de pianistes de France.",
    url: "https://www.maestroconcerts.com/collaborations",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Maestro Collaborations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Collaborations | Maestro",
    description: "Explorez les collaborations de la troupe Maestro, la première troupe de pianistes de France.",
    images: ["/og-image.png"],
  },
};

export default function CollaborationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
