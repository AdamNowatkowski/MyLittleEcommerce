import { executeGraphql } from "@/api/graphqlApi";

import { ReviewCreateDocument } from "@/gql/graphql";

export async function createReview(
	productId: string,
	email: string,
	headline: string,
	name: string,
	rating: number,
	content: string,
) {
	const ratingInt = parseInt(rating.toString());
	console.log(typeof ratingInt);
	return executeGraphql({
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
}