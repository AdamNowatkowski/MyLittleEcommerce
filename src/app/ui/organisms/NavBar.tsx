import { ShoppingCart } from "lucide-react";
import { type Route } from "next";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ActiveLink } from "@/app/ui/atoms/ActiveLink";
import { SearchBar } from "@/app/ui/atoms/SearchBar";
import { getCartFromCookies } from "@/api/cart";

export async function Nav() {
	const cart = await getCartFromCookies();
	const quantity = cart?.orderItems.length ?? 0;

	const navLinks = [
		{ href: "/products" as Route, label: "All" },
		{ href: "/" as Route, label: "Home" },
		{ href: "/categories/t-shirts/1" as Route, label: "T-Shirts" },
		// { href: "/categories/hoodies/1" as Route, label: "Hoodies" },
		{ href: "/categories/accessories/1" as Route, label: "Accessories" },
	];
	return (
		<div className="sticky top-0 z-20 border-b-2 bg-gray-950 bg-opacity-60 backdrop-blur-lg">
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
							<ul className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-2 lg:space-x-6">
								{navLinks.map((link) => (
									<li key={link.href} role="navigation" className=" pl-4 last:pr-4 lg:px-0">
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
						{/* <div className="">
							
						</div> */}
						<div className="group-m-2 flex items-center">
							<div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-2 lg:space-x-6">
								<SearchBar  />
							</div>
							<Link href="/cart/sidebar" aria-hidden="true">
								<ShoppingCart
									className="h-6 w-6 flex-shrink-0 "
								/>
								<span className="sr-only">items in cart, view bag</span>
							</Link>
							<span className="ml-2 mr-4 text-sm font-bold">
								{quantity}
							</span>
							<div>
								<SignedIn>
									<UserButton userProfileMode="navigation" afterSignOutUrl="/" userProfileUrl="/user" />
								</SignedIn>
								<SignedOut>
									<SignInButton />
								</SignedOut>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</div>
	);
}
