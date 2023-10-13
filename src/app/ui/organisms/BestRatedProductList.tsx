import { ProductList } from "@/app/ui/organisms/ProductList";
import { getProductsList } from "@/api/products";
import { type ProductListItemFragment } from "@/gql/graphql";

function sortProductsByReviews(products: ProductListItemFragment[]) {
	const productsWithAvgRating = products.map((product) => {
		const avgRating =
			product.reviews.reduce((sum, review) => sum + review.rating, 0) /
			product.reviews.length;
		return { ...product, avgRating: isNaN(avgRating) ? 0 : avgRating };
	});
	const sortedProducts = productsWithAvgRating.sort((a, b) => {
		if (b.avgRating !== a.avgRating) {
			return b.avgRating - a.avgRating;
		}
		return a.price - b.price;
	});
	return sortedProducts;
}

export async function BestRatedProducts() {
	const products = await getProductsList();

	const sortedProductsByReview = sortProductsByReviews(products);

	return (
		<div data-testid="related-products">
			<ProductList products={sortedProductsByReview.slice(0, 4)} pagination={"1"} />
		</div>
	);
}
