import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/header";
import ScrollProvider from "@/lib/scroll-provider";
import { ViewTransitions } from "next-view-transitions";
import Footer from "@/components/footer";


const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

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
			<html lang="en">
				<ScrollProvider>
					<body
						className={`${geistSans.variable} ${geistMono.variable} antialiased`}
					>
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
