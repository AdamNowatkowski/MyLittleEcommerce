"use client";

import { type Route } from "next";
// import clsx from "clsx";
import { usePathname } from "next/navigation";
import { ActiveLink } from "@/app/ui/atoms/ActiveLink";

export const PaginationList = ({
	paginationLenght, // currentPagination,
}: {
	paginationLenght: number;
	currentPagination: number;
}) => {
	const path = usePathname();
	const toRoute = (pageNumber: number) => {
		if (path.split('/')[1] === 'products' ) {
		return ("/products/" + (pageNumber + 1)) as Route;}
		else if (path.split('/')[1] === 'categories' ) {	
			return ("/categories" +
				"/" +
				path.split("/")[2] +
				"/" +
				(pageNumber + 1)) as Route;
	}
	else if (path.split('/')[1] === 'collections' ) {	
		return ("/collections" +
			"/" +
			path.split("/")[2] +
			"/" +
			(pageNumber + 1)) as Route;
	
} return path as Route
} 

	return (
		<div
			aria-label="Pagination"
			className="mb-5 flex justify-center space-x-2"
		>
			{Array.from(Array(paginationLenght).keys()).map((pageNumber) => (
				<ActiveLink
					key={pageNumber}
					href={toRoute(pageNumber)}
					className="p-2 text-xl hover:scale-110 "
					activeClassName="font-bold scale-110"
				>
					{pageNumber + 1}
				</ActiveLink>
			))}
		</div>
	);
};
