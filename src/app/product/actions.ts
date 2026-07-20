"use server";

import { type ProductListItemFragment } from "@/gql/graphql";
import { createReview, publishReview } from "@/api/reviews";
import { revalidatePath, revalidateTag } from "next/cache";

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

	if (!reviewId) throw new Error("Failed to create review");

	await publishReview(reviewId.createReview?.id as string);

	revalidatePath(`/product/${product.id}`);
	revalidateTag("product");

	const reviews = [...product.reviews, newReview];

	return reviews;
}