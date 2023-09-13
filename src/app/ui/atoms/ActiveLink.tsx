"use client";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

export const ActiveLink = ({
	href,
	children,
	className,
	activeClassName,
}: {
	href: string;
	children: ReactNode;
	className: string;
	activeClassName: string;
}) => {
	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<Link href={href} className={clsx(className, isActive && activeClassName)}>
			{children}
		</Link>
	);
};
