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
		<div aria-label="Pagination" className="mb-5 flex justify-center space-x-2">
			{Array.from(Array(paginationLenght - 1).keys()).map((pageNumber) => (
				<ActiveLink
                    key={pageNumber}
                    href={"/products/" + (pageNumber + 1)}
                    className="p-2 text-xl hover:scale-110 "
                    activeClassName = "font-bold scale-110"
                >
					{pageNumber + 1}
				</ActiveLink>
			))}
		</div>
	);
};
