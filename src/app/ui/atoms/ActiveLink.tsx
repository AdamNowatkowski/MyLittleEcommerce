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
	const pathnameLenght = pathname.split("/").length - 2;
	const hrefLength = href.split("/").length - 1;
	let isActive = href.split("/")[hrefLength] === pathname.split("/")[pathnameLenght] || href.split("/")[hrefLength] === pathname.split("/")[hrefLength]
	const productPage: Route = "/products";
	const hrefForLandingProductPage = "/products/1" as Route;
	if (pathname === productPage && href === hrefForLandingProductPage) {
		isActive = true;
	}

	return (
		<Link href={href} aria-current={isActive ? true : undefined} className={clsx(className, isActive && activeClassName)}>
			{children}
		</Link>
	);
};
