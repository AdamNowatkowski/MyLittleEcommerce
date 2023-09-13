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
	const pathname = usePathname();
	let isActive = pathname === href
	if (pathname === "/products" && href === "/products/1") {
		isActive = true;}

	return (
		<Link href={href} className={clsx(className, isActive && activeClassName)}>
			{children}
		</Link>
	);
};
