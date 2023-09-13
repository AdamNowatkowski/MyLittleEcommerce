"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export const PaginationButton = () => {
	const params = useParams(); // interesting and useful
	const paramsPagination = params.pagination as number;
	const [pagination, setPagination] = useState(paramsPagination);
	const router = useRouter();
	// router.replace(`/products/${pagination}`)

	return (
		<div>
			<button
				className="border border-slate-500 px-4"
				onClick={() => setPagination((pagination) => pagination - 1)}
			>
				Previous Site
			</button>
			<input
				className="border border-slate-500 px-4"
				readOnly
				value={pagination}
			/>
			<button
				className="border border-slate-500 px-4"
				onClick={() => setPagination((pagination) => pagination + 1)}
			>
				Next Site
			</button>
		</div>
	);
};
