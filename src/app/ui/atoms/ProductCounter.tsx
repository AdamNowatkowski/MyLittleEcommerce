"use client";

import {
	useParams,
	usePathname,
	useRouter,
	useSearchParams,
} from "next/navigation";
import { type ReactNode, useState, useEffect } from "react";

export const ProductCounter = ({ children }: { children: ReactNode }) => {
	useParams();
	useSearchParams();
	usePathname();

	console.log(useRouter()); //ciekawostka pokazuje wszystko co jest w routerze w konsoli
	const router = useRouter();

	const isLoggedIn = () => {
		return false;
	};
	useEffect(() => {
		if (isLoggedIn()) {
			router.replace("/dashboard");
		}
	}, [router]);
	// sometimes it is better to not use useEffect and use this instead:
	// if (isLoggedIn()) {router.replace("/dashboard")}

	const [counter, setCounter] = useState(0);
	return (
		<div>
			<button
				className="border border-slate-500 px-4"
				onClick={() => setCounter((counter) => counter - 1)}
			>
				-
			</button>
			<input
				className="border border-slate-500 px-4"
				readOnly
				value={counter}
			/>
			<button
				className="border border-slate-500 px-4"
				onClick={() => setCounter((counter) => counter + 1)}
			>
				+
			</button>
			{counter % 2 === 0 && children}
		</div>
	);
};
