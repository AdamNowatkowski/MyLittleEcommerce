"use server";

import { revalidateTag } from "next/cache";
import { executeGraphql } from "@/api/graphqlApi";
import { ReviewCreateDocument, ReviewPublishDocument } from "@/gql/graphql";

export async function createReview(
	productId: string,
	email: string,
	headline: string,
	name: string,
	rating: number,
	content: string,
) {
	const ratingInt = parseInt(rating.toString());

	const revId = await executeGraphql({
		query: ReviewCreateDocument,
		variables: {
			email: email,
			headline: headline,
			name: name,
			rating: ratingInt,
			content: content,
			productId: productId,
		},
		cache: "no-store",
	});


	return revId
}

export async function publishReview(id: string) {
	const x = await executeGraphql({
		query: ReviewPublishDocument,
		variables: {
			id: id
		},
		cache: "no-store",
	});
	console.log(x)
	revalidateTag("product");
	
}