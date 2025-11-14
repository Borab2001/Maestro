import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { League_Spartan } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import Header from "@/components/header";
import ScrollProvider from "@/lib/scroll-provider";
import { ViewTransitions } from "next-view-transitions";
import Footer from "@/components/footer";
// import PianoTiles from "@/components/piano-tiles";


const leagueSpartan = League_Spartan({
	variable: "--font-league-spartan",
	subsets: ["latin"],
});

const satoshi = localFont({
    src: [
        {
            path: '../public/fonts/satoshi/Satoshi-Regular.woff2',
            weight: '400',
            style: 'normal'
        },
		{
            path: '../public/fonts/satoshi/Satoshi-Medium.woff2',
            weight: '500',
            style: 'normal'
        },
        {
            path: '../public/fonts/satoshi/Satoshi-Bold.woff2',
            weight: '700',
            style: 'normal'
        }
    ],
	display: 'swap',
    variable: '--font-satoshi'
});

export const metadata: Metadata = {
	title: "Maestro - Première troupe de pianistes de France",
	description: "/",
};


export default function RootLayout({
  	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ViewTransitions>
			<html lang="fr">
				<ScrollProvider>
					<body
						className={`${satoshi.className} ${leagueSpartan.variable} antialiased max-w-screen-limit mx-auto`}
					>
						{/* <PianoTiles
							animationDelay={1.5}
							animationDuration={0.5}
							stagger={0.025}
							whiteKeyClassName=""
							blackKeyClassName=""
						>	 */}
							<Header />
							{children}
							<Footer />
							<Analytics />
						{/* </PianoTiles> */}
					</body>
				</ScrollProvider>
			</html>
		</ViewTransitions>
	);
}
