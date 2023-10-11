"use client";

import { experimental_useOptimistic as useOptimistic } from "react";
import { useRouter } from "next/navigation";
import { changeItemQuantity, removeItem } from "@/app/cart/actions";

export const IncrementProductQuantity = ({
	itemId,
	quantity,
}: {
	itemId: string;
	quantity: number;
}) => {
	const router = useRouter();

	const [optimisticQuantity, setOptimisticQuantity] =
		useOptimistic(quantity);
	return (
		<form>
			<button
				data-testid="decrement"
				className="mr-2 border-white bg-inherit font-bold"
				formAction={async () => {
					if (optimisticQuantity === 1) {
						await removeItem(itemId);
						router.refresh();
					} else {
						setOptimisticQuantity(optimisticQuantity - 1);
						await changeItemQuantity(itemId, optimisticQuantity - 1);
					}
				}}
			>
				-
			</button>
			<span data-testid="quantity">{optimisticQuantity}</span>
			<button
				data-testid="increment"
				className="ml-2 border-white bg-inherit font-bold"
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
