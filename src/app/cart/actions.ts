"use server";
import { revalidateTag, revalidatePath } from "next/cache";
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
		cache: "no-store",
	});
	revalidateTag("cart", "max");
	revalidatePath("/cart");
};

export const changeItemQuantity = async (itemId: string, quantity: number) => {
	await executeGraphql({
		query: CartSetProductQuantityDocument,
		variables: {
			itemId: itemId,
			quantity: quantity,
		},
		cache: "no-store",
	});
	revalidateTag("cart", "max");
	revalidatePath("/cart");
};
