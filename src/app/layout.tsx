import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Nav } from "./ui/organisms/NavBar";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "My Little Ecommerce",
	description:
		"Powered by Next.js, Tailwind CSS, and TypeScript. Built by Adam Nowatkowski",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pl" className="h-full bg-black text-white">
			<body className='h-full'>
				<Nav />
				<section className="sm:max-2-2xl mx-auto max-w-md p-12 sm:py-16 md:max-w-4xl lg:max-w-7xl ">
					{children}
				</section>
				<Analytics />
				<footer className="text-center text-xs text-gray-500">
					<p >
						© {new Date().getFullYear()} Adam Nowatkowski. All rights reserved.
					</p>
					<p className="italic mt-2"><Link href='/polityka-prywatnosci'>Polityka Prywatności</Link></p>
					<p className="italic"><Link href='/regulamin'>Regulamin</Link></p>
				</footer>
			</body>
		</html>
	);
}
