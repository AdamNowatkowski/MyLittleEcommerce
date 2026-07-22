"use server";
import { type ProductListItemFragment } from "@/gql/graphql";
import { createReview, publishReview } from "@/api/reviews";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getProductById } from "@/api/products";
import { getOrCreateCart, addToCart } from "@/api/cart";

export async function addToCartActionForm(formData: FormData) {
	const productId = formData.get("productId") as string;
	if (!productId) throw new Error("Missing productId");

	const products = await getProductById(productId);
	const product = products[0];
	if (!product) throw new Error("Product not found");

	const cart = await getOrCreateCart();
	await addToCart(cart, product);
	
	// @ts-expect-error Next.js type bug
	revalidateTag("cart");
	redirect(`/product/${product.id}`);
}

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
	// @ts-expect-error Next.js type bug
	revalidateTag("product");

	const reviews = [...product.reviews, newReview];

	return reviews;
}