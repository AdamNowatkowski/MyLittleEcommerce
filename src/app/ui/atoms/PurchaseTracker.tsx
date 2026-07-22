"use client";

import { useEffect, useRef } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { useUser } from "@clerk/nextjs";

export const PurchaseTracker = ({
	transactionId,
	value,
	currency,
	items,
}: {
	transactionId: string;
	value: number;
	currency: string;
	items: any[];
}) => {
	const tracked = useRef(false);
	const { isLoaded, user } = useUser();

	useEffect(() => {
		if (!tracked.current && isLoaded) {
			sendGAEvent("event", "purchase", {
				transaction_id: transactionId,
				value: value,
				currency: currency.toUpperCase(),
				items: items,
				user_id: user?.id,
			});
			tracked.current = true;
		}
	}, [transactionId, value, currency, items, isLoaded, user?.id]);

	return null;
};
