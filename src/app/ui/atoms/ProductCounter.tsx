"use client";

import { type ReactNode, useState } from "react";

export const ProductCounter = ({ children }: { children: ReactNode }) => {
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
