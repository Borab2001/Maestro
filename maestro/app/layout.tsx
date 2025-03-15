import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { Geist, Geist_Mono } from "next/font/google";
// import localFont from "next/font/local";
import "./globals.css";

import Header from "@/components/header";
import ScrollProvider from "@/lib/scroll-provider";
import { ViewTransitions } from "next-view-transitions";
import Footer from "@/components/footer";
import PreloadAnimation from "@/components/preload-animation";


const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

// const satoshi = localFont({
//     src: [
//         {
//             path: '..public/fonts/satoshi/Satoshi-Regular.woff2',
//             weight: '400',
//             style: 'normal'
//         },
// 		{
//             path: '..public/fonts/satoshi/Satoshi-Medium.woff2',
//             weight: '500',
//             style: 'normal'
//         },
//         {
//             path: '..public/fonts/satoshi/Satoshi-Bold.woff2',
//             weight: '700',
//             style: 'normal'
//         }
//     ],
// 	display: 'swap',
//     variable: '--font-satoshi'
// });

export const metadata: Metadata = {
	title: "Surprise",
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
						className={`${geistSans.variable} ${geistMono.variable} antialiased`}
					>
						<PreloadAnimation />
						<Header />
						{children}
						<Footer />
						<Analytics />
					</body>
				</ScrollProvider>
			</html>
		</ViewTransitions>
	);
}
