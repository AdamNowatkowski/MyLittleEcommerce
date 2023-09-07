import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "My Little Ecommerce",
	description: "Powered by Next.js, Tailwind CSS, and TypeScript. Built by Adam Nowatkowski",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pl">
			<body className={inter.className}>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
