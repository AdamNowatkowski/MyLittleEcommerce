"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { type Route } from "next";
import { Search } from "lucide-react";
import {
	useState,
	useEffect,
	type ChangeEvent,
	type FormEvent,
} from "react";
import { useDebounce } from "use-debounce";

export const SearchBar = () => {
	const router = useRouter();
	const searchParams = useSearchParams()!;
	const [query, setQuery] = useState(searchParams.get("query") || "");
	const [value] = useDebounce(query, 500);

	const handleSearchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.value === "") {
			router.back();
		}
		setQuery(event.target.value);
	};

	const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		router.push(`/search?query=${query}` as Route);
	};

	useEffect(() => {
		if (value) {
			router.push(`/search?query=${encodeURIComponent(query)}` as Route);
		}
	}, [value]);

	return (
		<form
			className="flex justify-between gap-3 p-3"
			action={`/search`}
			onSubmit={handleSearchSubmit}
		>
			<input
				className="bg-inherit p-3"
				type="search"
				role="searchbox"
				onChange={handleSearchOnChange}
				value={query}
				placeholder="Search Products..."
				aria-label="Search Products..."
			/>
			<button className=" bg-inherit" type="submit" aria-label="Search">
				<Search className="h-6 w-6 flex-shrink-0 " />
			</button>
		</form>
	);
};
