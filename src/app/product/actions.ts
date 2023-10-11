"use server";

import { type ProductListItemFragment } from "@/gql/graphql";
import { createReview, publishReview } from "@/api/reviews";


export async function createReviewAction(
	newReview: {		
	rating: number,
	email: string,
	name: string,
	headline: string,
	content: string,
	createAt: string},
	product: ProductListItemFragment,
) {

	const reviewId = await createReview(
		product.id,
		newReview.email,
		newReview.headline,
		newReview.name,
		newReview.rating,
		newReview.content,
	);

	// console.log(reviewId.createReview?.id);

	if (!reviewId) throw new Error("Failed to create review");

	await publishReview(reviewId.createReview?.id as string);

	const reviews = [...product.reviews, newReview];

	return reviews;
}