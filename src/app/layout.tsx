import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";

import { Nav } from "@/app/ui/organisms/NavBar";
import { MetaPixel } from "@/app/ui/MetaPixel";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
	title: "My Little Ecommerce",
	description:
		"Powered by Next.js, Tailwind CSS, and TypeScript. Built by Adam Nowatkowski",
};

export default function RootLayout({
	children,
	modal,
}: {
	children: React.ReactNode;
	modal: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="pl" className="h-full bg-black text-white">
				<body className={inter.className + " h-full"}>
					<Nav />
					<main className="sm:max-2-2xl mx-auto max-w-md p-12 sm:py-16 md:max-w-4xl lg:max-w-7xl ">
						{children}
					</main>
					<Analytics />
					{process.env.NEXT_PUBLIC_GA_ID && (
						<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
					)}
					<MetaPixel />
					<footer className="mt-12 text-center text-xs text-gray-500 pb-12">
						<p>
							© {new Date().getFullYear()} Adam Nowatkowski. All rights
							reserved.
						</p>
						<p className="mt-2 space-x-4">
							<Link href="/polityka-prywatnosci" className="hover:text-gray-300 transition-colors">
								Polityka Prywatności
							</Link>
							<Link href="/regulamin" className="hover:text-gray-300 transition-colors">
								Regulamin
							</Link>
						</p>
					</footer>
					{modal}
				</body>
			</html>
		</ClerkProvider>
	);
}
