"use client";
import { useFormStatus } from "react-dom";

import { sendGAEvent } from "@next/third-parties/google";

export const AddToCartButton = ({
	value,
	items,
}: {
	value?: number;
	items?: any[];
}) => {
	const formStatus = useFormStatus();

	return (
		<button
			type="submit"
			data-testid="add-to-cart-button"
			disabled={formStatus.pending}
			onClick={() =>
				sendGAEvent("event", "add_to_cart", {
					currency: "PLN",
					value: value,
					items: items,
				})
			}
			className="inline-flex h-14 w-full items-center justify-center rounded-md 
			from-[#1e4b65] from-20% via-[#010315] to-[#0b237d] to-80% 
			px-6 text-base font-medium leading-6 text-white shadow 
			transition duration-150 ease-in-out enabled:bg-gradient-to-r 
			hover:enabled:brightness-125 disabled:cursor-wait disabled:bg-gray-300"
		>
			{formStatus.pending ? "Adding to cart..." : "Add to cart"}
		</button>
	);
};
