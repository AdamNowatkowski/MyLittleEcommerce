"use client";

// import { useTransition } from "react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from 'lucide-react';
import { removeItem } from "@/app/cart/actions";
import { sendGAEvent } from "@next/third-parties/google";

export const RemoveButton = ({ itemId }: { itemId: string }) => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	return (
		<button
			className="text-red-500 disabled:text-gray-600"
			disabled={isPending}
			onClick={() => {
				sendGAEvent({ event: "remove_from_cart", value: itemId });
				startTransition(async () => {
					await removeItem(itemId);
					router.refresh();
				});
			}}
		>
			<Trash2 className="w-4 h-4" />
		</button>
	);
};
