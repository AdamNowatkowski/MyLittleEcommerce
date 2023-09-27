import { BestRatedProducts } from "@/app/ui/organisms/BestRatedProductList";
import { CollectionList } from "@/app/ui/organisms/CollectionList";
import { getCollectionsList } from "@/api/products";


export default async function HomePage() {
	const collections = await getCollectionsList();

	return (
		<div>
			<h1>Our Collections</h1>
			<div>
			<CollectionList collections={collections} />
			</div>
			<h2>Loved by our clients!</h2>
			<p>BestSellers</p>
			<BestRatedProducts />
		</div>
	);
}