import type { Metadata } from "next";
import "./globals.css";

import { Rubik } from "next/font/google";

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
			<body className={font.className}>{children}</body>
		</html>
	);
}
