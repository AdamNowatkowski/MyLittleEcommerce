import { BestRatedProducts } from "@/app/ui/organisms/BestRatedProductList";
import { CollectionList } from "@/app/ui/organisms/CollectionList";
import { getCollectionsList } from "@/api/products";


export default async function HomePage() {
	const collections = await getCollectionsList();

	return (
		<div className="sm:max-2-2xl mx-auto max-w-md p-12 sm:py-16 md:max-w-4xl lg:max-w-7xl">
			<h1 className="text-3xl font-bold tracking-tight mb-8">Our Collections</h1>
			<CollectionList collections={collections} />
			
			<div className="mt-16">
				<h2 className="text-3xl font-bold tracking-tight mb-2">Loved by our clients!</h2>
				<p className="text-lg text-gray-500 mb-8">BestSellers:</p>
				<BestRatedProducts />
			</div>
		</div>
	);
}