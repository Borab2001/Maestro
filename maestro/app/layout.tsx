import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/header";
import ScrollProvider from "@/lib/scroll-provider";


const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Maestro",
	description: "/",
};


export default function RootLayout({
  	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<ScrollProvider>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<Header />
					{children}
				</body>
			</ScrollProvider>
		</html>
	);
}
