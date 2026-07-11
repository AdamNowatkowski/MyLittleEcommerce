import { ProductList } from "@/app/ui/organisms/ProductList";
import { getProductsList } from "@/api/products";
import { PaginationList } from "@/app/ui/molecules/PaginationList";

export default async function ProductsPage({
	searchParams,
}: {
	searchParams: Promise<{ page?: string }>;
}) {
	const params = await searchParams;
	const page = Number(params.page) || 1;
	const limit = 4;
	const skip = (page - 1) * limit;
	
	const products = await getProductsList(limit, skip);

	return (
		<section className="sm:max-2-2xl mx-auto max-w-md p-12 sm:py-16 md:max-w-4xl lg:max-w-7xl ">
			<ProductList products={products} pagination={page.toString()} />
			
			<PaginationList
				aria-label="Pagination"
				paginationLenght={5} 
				currentPagination={page}
			/>
		</section>
	);
}
