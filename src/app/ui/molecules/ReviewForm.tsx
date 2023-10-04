import { createReview } from "@/api/reviews";
import { StarRating } from "@/app/ui/atoms/StarForm";

async function createReviewAction(formData: FormData) {
	"use server";
	// console.log(FormData)
	if (!formData.get("rating")) throw new Error("No rating");

	await createReview(
		formData.get("productId") as string,
		formData.get("email") as string,
		formData.get("headline") as string,
		formData.get("name") as string,
		formData.get("rating") as unknown as number,
		formData.get("content") as string,
	);
}
type ReviewFormProps = {
	id: string;
};


export const ReviewForm = (id: ReviewFormProps) => {
	return (
		<div className="mt-5 max-w-xs overflow-hidden rounded-md border bg-black">
			<form action={createReviewAction} method="POST" id="reviewForm" name="reviewForm" data-testid="add-review-form">
				<div className="mb-4">
					<label htmlFor="headline" className="mb-2 ml-2 block font-bold">
						Headline
					</label>
					{/* <h1>-----</h1>
					<h1>- {JSON.stringify(id} -</h1>
					<h1>-----</h1> */}
					<input type="hidden" name="productId" value={id.id}></input>
					<input
						type="text"
						id="headline"
						name="headline"
						className="w-7/8 ml-4 mr-4 rounded-md border-gray-300 bg-gray-700"
						required
					></input>
				</div>
				<div className="mb-4">
					<label htmlFor="content" className="mb-2 ml-2 block font-bold">
						Content
					</label>
					<textarea
						id="content"
						name="content"
						className="w-7/8 ml-4 mr-4 rounded-md border-gray-300 bg-gray-700"
						required
					></textarea>
				</div>
				<div className="flex items-center bg-black">
					<StarRating />
				</div>
				<div className="mb-4">
					<label htmlFor="name" className="mb-2 ml-2 block font-bold">
						Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						className="w-7/8 ml-4 mr-4 rounded-md border-gray-300 bg-gray-700"
						required
					></input>
				</div>
				<div className="mb-4">
					<label htmlFor="email" className="mb-2 ml-2 block font-bold">
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						className="w-7/8 ml-4 mr-4 rounded-md border-gray-300 bg-gray-700"
						required
					></input>
				</div>
				<button
					type="submit"
					className="rounded-md bg-yellow-400 px-4 py-2 text-gray-800"
				><button type="reset">
					Submit
					</button>
				</button>
			</form>
		</div>
	);
};
