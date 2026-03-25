import type { Metadata } from "next";
import artists from "@/data/artists.json";

export function generateMetadata({
	params,
}: {
	params: { id: string };
}): Metadata {
	const artist = artists.find((a) => a.id === params.id);

	if (!artist) {
		return {
			title: "Artiste non trouvé",
		};
	}

	return {
		title: artist.name,
		description: artist.bio,
		openGraph: {
			title: `${artist.name} | Maestro | Première troupe de pianistes de France`,
			description: artist.bio,
			url: `https://www.maestroconcerts.com/artists/${artist.id}`,
			type: "profile",
			images: [
				{
					url: artist.portrait,
					width: 800,
					height: 1000,
					alt: `${artist.name} portrait`,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: `${artist.name} | Maestro | Première troupe de pianistes de France`,
			description: artist.bio,
			images: [artist.portrait],
		},
	};
}

export default function ArtistLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
