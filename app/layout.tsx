import type { Metadata } from "next";
import "./globals.css";

import { Inter_Tight } from "next/font/google";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme";

const font = Inter_Tight({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Spotisaver",
	description: "Analyze and save your Spotify playlists!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={font.className}>
				<main className="min-h-screen w-full bg-gradient-to-t from-[#1DB954]/50 to-background">
					<ThemeProvider
						attribute="class"
						defaultTheme="light"
						enableSystem
						disableTransitionOnChange
					>
						<Navbar />
						<div className="mt-24">{children}</div>
						<Footer />
					</ThemeProvider>
				</main>
			</body>
		</html>
	);
}
