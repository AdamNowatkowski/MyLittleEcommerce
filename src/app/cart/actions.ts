"use server";
import { executeGraphql } from "@/api/graphqlApi";
import {
	CartSetProductQuantityDocument,
	CartRemoveProductDocument,
} from "@/gql/graphql";

export const removeItem = (itemId: string) => {
	return executeGraphql({
		query: CartRemoveProductDocument,
		variables: {
			itemId: itemId,
		},
	});
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
