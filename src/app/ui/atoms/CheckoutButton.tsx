"use client";

import { useFormStatus } from "react-dom";
import { sendGAEvent } from "@next/third-parties/google";

export const CheckoutButton = () => {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending}
			onClick={() => sendGAEvent({ event: "begin_checkout" })}
			className="w-full rounded-md border border-transparent bg-yellow-400 px-4 py-3 text-base font-medium text-black shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
		>
			{pending ? "Processing..." : "Checkout / Pay"}
		</button>
	);
};
