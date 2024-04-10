import type { Metadata } from "next";
import "./globals.css";

import { Inter_Tight } from "next/font/google";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme";

const font = Inter_Tight({ subsets: ["latin"] });

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
				<main className="bg-background">
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
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
