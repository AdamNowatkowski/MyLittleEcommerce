"use server";
import { revalidateTag } from "next/cache";
import { executeGraphql } from "@/api/graphqlApi";
import {
	CartSetProductQuantityDocument,
	CartRemoveProductDocument,
} from "@/gql/graphql";

export const removeItem = async (itemId: string) => {
	await executeGraphql({
		query: CartRemoveProductDocument,
		variables: {
			itemId: itemId,
		},
	});
	revalidateTag("cart");
};

export const changeItemQuantity = (itemId: string, quantity: number) => {
	return executeGraphql({
		query: CartSetProductQuantityDocument,
		variables: {
			itemId: itemId,
			quantity: quantity,
		},
	});
};
