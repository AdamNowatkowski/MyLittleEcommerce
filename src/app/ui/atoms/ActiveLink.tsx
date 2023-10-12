"use client";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { type Route } from "next";

export const ActiveLink = ({
	href,
	children,
	className,
	activeClassName,
}: {
	href: Route;
	children: ReactNode;
	className: string;
	activeClassName: string;
}) => {
	const pathname = usePathname() as Route;
	let isActive = pathname === href;
	const productPage: Route = "/products";
	const hrefForLandingProductPage = "/products/1" as Route;
	if (pathname === productPage && href === hrefForLandingProductPage) {
		isActive = true;
	}

	return (
		<Link href={href} aria-current={isActive} className={clsx(className, isActive && activeClassName)}>
			{children}
		</Link>
	);
};
