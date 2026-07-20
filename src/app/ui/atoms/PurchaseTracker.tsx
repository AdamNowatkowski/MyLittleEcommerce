"use client";

import { useEffect, useRef } from "react";
import { sendGAEvent } from "@next/third-parties/google";

export const PurchaseTracker = ({
	transactionId,
	value,
	currency,
}: {
	transactionId: string;
	value: number;
	currency: string;
}) => {
	const tracked = useRef(false);

	useEffect(() => {
		if (!tracked.current) {
			sendGAEvent("event", "purchase", {
				transaction_id: transactionId,
				value: value,
				currency: currency.toUpperCase(),
			});
			tracked.current = true;
		}
	}, [transactionId, value, currency]);

	return null;
};
