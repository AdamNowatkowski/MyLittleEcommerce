import { BestRatedProducts } from "@/app/ui/organisms/BestRatedProductList";
import { CollectionList } from "@/app/ui/organisms/CollectionList";
import { getCollectionsList } from "@/api/products";


export default async function HomePage() {
	const collections = await getCollectionsList();

	return (
		<div>
			<div>
			<CollectionList collections={collections} />
			</div>
			<h1>Loved by our clients!</h1>
			<p>BestSellers</p>
			<BestRatedProducts />
		</div>
	);
}