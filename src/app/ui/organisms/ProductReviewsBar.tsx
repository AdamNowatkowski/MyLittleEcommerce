"use client";

import { useOptimistic } from "react";
import { SingleReview } from "@/app/ui/atoms/SingleReview";
import { ReviewForm } from "@/app/ui/molecules/ReviewForm";
import { type ProductListItemFragment } from "@/gql/graphql";
import {createReviewAction} from "@/app/product/actions";
// import { createReview, publishReview } from "@/api/reviews";

type ProductListItemProps = {
	product: ProductListItemFragment;
};


export const ProductReviewsBar = ({ product }: ProductListItemProps) => {
	const [optimisticReviews, setOptimisticReviews] = useOptimistic(
		product?.reviews,
	);
	// console.log("111111111111111111111")

	// console.log(product?.reviews)
	
	async function actionFn(formData: FormData) {
		const currentDate = new Date();
		const newReview = {
			rating: Number(formData.get("rating")),
			email: (formData.get("email") as string) || "test@test.com",
			name: formData.get("name") as string,
			headline: formData.get("headline") as string,
			content: formData.get("content") as string,
			createAt: currentDate.toISOString(),
		};
		
		setOptimisticReviews([...optimisticReviews, { ...newReview, createdAt: newReview.createAt }]);
		await createReviewAction(newReview, product);
	}

	return (
		<aside className="">
			<div className="mx-auto max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:py-16">
				<div className="lg:col-span-4">
					<div className="mt-5 max-w-xs border-spacing-4 overflow-hidden  rounded-md bg-black">
						<form
							action={actionFn}
							id="reviewForm"
							name="reviewForm"
							data-testid="add-review-form"
						>
							<ReviewForm id={product.id} />
							<button
								type="submit"
								className="rounded-md bg-yellow-400 px-4 py-2 text-gray-800"
										>
							Submit
						</button>
						</form>
					</div>
				</div>
				<div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
					<ul>
						{optimisticReviews.map((review: any) => {
							return (
								<li key={product.id}>
									<SingleReview
										key={product.id}
										rating={review.rating}
										name={review.name}
										content={review.content}
										headline={review.headline}
										createdAt={(review.createdAt as string).toString()}
									/>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</aside>
	);
};
