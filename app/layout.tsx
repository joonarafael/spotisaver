import type { Metadata } from "next";
import "./globals.css";

import { Rubik } from "next/font/google";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme";

const font = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Spotisaver",
	description: "Application to analyze and save your playlists!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={font.className}>
				<main className="min-h-screen w-full bg-gradient-to-t from-[#1DB954] to-background">
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<Navbar />
						<div className="flex pt-48">{children}</div>
						<Footer />
					</ThemeProvider>
				</main>
			</body>
		</html>
	);
}
