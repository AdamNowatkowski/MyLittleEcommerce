import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
import { Nav } from "./ui/organisms/NavBar";

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
					<footer className="text-center text-xs text-gray-500">
						<p>
							© {new Date().getFullYear()} Adam Nowatkowski. All rights
							reserved.
						</p>
						<p className="mt-2 italic">
							<Link href="/polityka-prywatnosci">
								Polityka Prywatności
							</Link>
						</p>
						<p className="italic">
							<Link href="/regulamin">Regulamin</Link>
						</p>
						<p className="mt-4 italic">
							THIS IS TRAINING ECOMMERCE SHOP - NOT REAL
						</p>
						<p>ONE YOU CAN NOT BUY ITEMS PRESENTED HERE</p>
						<p>Especially you can not buy Pomidor here!!!</p>
					</footer>
					{modal}
				</body>
			</html>
		</ClerkProvider>
	);
}
