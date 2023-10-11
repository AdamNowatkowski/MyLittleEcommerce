// import { headers } from "next/headers";
import { type NextRequest } from "next/server";
import { notFound } from "next/navigation";
import {
	ReviewsGetByProductIdDocument,
	ProductUpdateAverageRatingDocument
} from "@/gql/graphql";
import { executeGraphql } from "@/api/graphqlApi";

export type BodyReviewInsertType = {
    operation: string;
    data:      {
		__typename:  string;
		content:     string;
		createdAt:   Date;
		createdBy:   {
			__typename: string;
			id:         string;
		};
		email:       string;
		headline:    string;
		id:          string;
		name:        string;
		product:     {
			__typename: string;
			id:         string;
		};
		publishedAt: Date;
		publishedBy: {
			__typename: string;
			id:         string;
		};
		rating:      number;
		scheduledIn: string[];
		stage:       string;
		updatedAt:   Date;
		updatedBy:   {
			__typename: string;
			id:         string;
		};
	};
}

export async function POST(request: NextRequest): Promise<Response> {
	console.log("1")
	const payLoad = await (request.json()) as BodyReviewInsertType
	const productId = payLoad.data.product.id
	const data = await executeGraphql({
		query: ReviewsGetByProductIdDocument,
		variables: {
			id: productId
		},
	});
	console.log("2")
	if (data.products[0] === undefined) {
		throw notFound();
	}
	const product = data.products[0];
	if (product.reviews[0]?.rating === undefined) {
		throw notFound();
	}

	const avgRating = product.reviews.reduce((acc, review) => {
        return acc + review.rating;
    }, 0) / product.reviews.length;
	console.log("3")

	const updateMessage = await executeGraphql({
		query: ProductUpdateAverageRatingDocument,
		variables: {
			avgRating: avgRating,
			id: productId
		},
	});

	console.log(updateMessage)
	//     return new Response(JSON.stringify('Hello, world!'),{
	//     headers: {
	//         'content-type': "application/json"
	//     },
	//     status:200

	// })
	console.log("4")

	return new Response("noice" , {status: 200});
}
