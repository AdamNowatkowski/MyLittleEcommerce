"use client";

// import clsx from "clsx";
import { ActiveLink } from "../atoms/ActiveLink";

export const PaginationList = ({
	paginationLenght,
	// currentPagination,
}: {
	paginationLenght: number;
	currentPagination: number;
}) => {

	return (
		<div aria-label="Pagination" className="mt-8 flex justify-center space-x-2">
			{Array.from(Array(paginationLenght - 1).keys()).map((pageNumber) => (
				<ActiveLink
                    key={pageNumber}
                    href={"/products/" + (pageNumber + 1)}
                    className=" border-2 border-slate-900 rounded-md p-2 hover:bg-slate-500"
                    activeClassName = "font-bold border-5 bg-slate-500"
                >
					{pageNumber + 1}
				</ActiveLink>
			))}
		</div>
	);
};
