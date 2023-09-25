import { ProductList } from "@/app/ui/organisms/ProductList";
import { getProductsList } from "@/api/products";
import { type ProductListItemFragment } from "@/gql/graphql";

function sortProductsByReviews(products: ProductListItemFragment[]) {
	const sortedProducts = products.sort((a, b) => {
		const aAvg =
			a.reviews.reduce((sum, review) => sum + review.rating, 0) /
			a.reviews.length;
		const bAvg =
			b.reviews.reduce((sum, review) => sum + review.rating, 0) /
			b.reviews.length;
		return bAvg - aAvg;
	});
	return sortedProducts;
}

export async function BestRatedProducts() {
	const products = await getProductsList();

	const sortedProductsByReview = sortProductsByReviews(products);

	return <ProductList products={sortedProductsByReview.slice(0, 4)} />;
}
