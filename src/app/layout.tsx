import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "My Little Ecommerce",
	description: "Powered by Next.js, Tailwind CSS, and TypeScript. Built by Adam Nowatkowski",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pl">
			<body className={inter.className}>
				<section className="sm:max-2-2xl mx-auto max-w-md p-12 sm:py-16 md:max-w-4xl lg:max-w-7xl ">
					{children}
				</section>
				<Analytics />
				<footer>
					<p className="text-center text-gray-500 text-xs">
						© {new Date().getFullYear()} Adam Nowatkowski. All rights reserved.
					</p>
					
				</footer>
			</body>
		</html>
	);
}
