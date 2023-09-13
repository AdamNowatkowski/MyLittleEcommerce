import "./globals.css";
import Link from "next/link";
import Image from 'next/image'
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ActiveLink } from "./ui/atoms/ActiveLink";

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
		<html lang="pl">
			<body className='bg-black text-white'>
				<nav className="flex items-center justify-between p-4">
					<Link href='/'>
					<Image
						src="/logo.svg"
						width={100}
						height={100}
						alt="Brand Logo"
						className="h-32 w-32 ml-10 mr-10 p-4 overflow-auto "
						/>
					</Link>
					<ul className="flex space-x-4 ml-10 mr-10">
						<li>
							<ActiveLink
								href="/"
								className="hover:text-gray-200"
								activeClassName="font-bold border-2 border-b-white border-l-black border-t-black border-r-black"
							>
								Home
							</ActiveLink>
						</li>
						<li>
							<ActiveLink
								href="/products"
								className="hover:text-gray-200"
								activeClassName="font-bold border-2 border-b-white border-l-black border-t-black border-r-black"
							>
								All
							</ActiveLink>
						</li>
					</ul>
				</nav>
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
