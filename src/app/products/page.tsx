import { ProductList } from "../ui/organisms/ProductList";
import { getProductsList } from "../../api/products";

export default async function ProductsPage() {
	const products = await getProductsList();

	return (
		<section className="sm:max-2-2xl mx-auto max-w-md p-12 sm:py-16 md:max-w-4xl lg:max-w-7xl ">
			<ProductList products={products} />
		</section>
	);
}
