"use client";

import { experimental_useOptimistic as useOptimistic } from "react";
import { changeItemQuantity } from "../../cart/actions";

export const IncrementProductQuantity = ({
	itemId,
	quantity,
}: {
	itemId: string;
	quantity: number;
}) => {
	const [optimisticQuantity, setOptimisticQuantity] =
		useOptimistic(quantity);

	return (
		<form>
			{optimisticQuantity}
			<button
				className="border-white bg-inherit font-bold ml-2"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity + 1);
					await changeItemQuantity(itemId, optimisticQuantity + 1);
				}}
			>
				+
			</button>
		</form>
	);
};