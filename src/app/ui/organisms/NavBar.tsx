import {ShoppingCart} from 'lucide-react';
import { type Route } from "next";
import Link from "next/link";
import Image from "next/image";
import { ActiveLink } from "../atoms/ActiveLink";

export async function Nav() {
	const navLinks = [
		{ href: "/products" as Route, label: "All" },
		{ href: "/" as Route, label: "Home" },
		{ href: "/t-shirts" as Route, label: "T-Shirts" },
		{ href: "/hoodies" as Route, label: "Hoodies" },
		{ href: "/Accesories" as Route, label: "Accesories" },
	];
	return (
		<div className="border-b-2 bg-gray-950 sticky top-0 z-20 bg-opacity-60 backdrop-blur-lg">
		<div className="mx-auto  max-w-7xl px-4 sm:px-6 lg:px-8 ">
		<nav className="">
			<div className="flex h-16 justify-between">
                <div className="flex">
					<div className="flex flex-shrink-0">
						<Link href="/">
							<Image
								src="/logo.svg"
								width={32}
								height={32}
								alt="Brand Logo"
								className=" mr-10 h-full w-full overflow-auto p-2 "
							/>
						</Link>
					</div>
				<ul className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-2 lg:space-x-6" >

					{navLinks.map((link) => (
						<li key={link.href} className=" pl-4 last:pr-4 lg:px-0">
							<ActiveLink
								href={link.href}
								className="flex h-full w-full min-w-[3rem] items-center justify-center hover:text-gray-200"
								activeClassName="font-bold border-b-2 border-b-white"
							>
								{link.label}
							</ActiveLink>
						</li>
					))}
				</ul>
                </div>
                <div className=""></div>
                <Link href="/cart" className="group-m-2 flex items-center">
                    <ShoppingCart aria-hidden="true" className="h-6 w-6 flex-shrink-0 " />
					<span className="ml-2 mr-4 text-sm font-bold">0</span>
					<span className="sr-only">items in cart, view bag</span>
                </Link>
			</div>
		</nav>
		</div>
		</div>
	);
}
