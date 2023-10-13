import { ProductList } from "@/app/ui/organisms/ProductList";
import { getProductsList } from "@/api/products";
import { PaginationList } from "@/app/ui/molecules/PaginationList";

export default async function ProductsPage() {
	const products = await getProductsList();


	return (
		<section className="sm:max-2-2xl mx-auto max-w-md p-12 sm:py-16 md:max-w-4xl lg:max-w-7xl ">

			<ProductList products={products.slice(0, 4)} pagination="1" />
			
			<PaginationList
				aria-label="Pagination"
				paginationLenght={Math.ceil(products.length / 4)}
				currentPagination={1}
			/>
		</section>
	);
}
