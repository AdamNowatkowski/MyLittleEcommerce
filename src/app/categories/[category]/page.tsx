import { notFound } from "next/navigation";
import { type Metadata } from "next/types";
import { ProductList } from "@/app/ui/organisms/ProductList";
import { PaginationList } from "@/app/ui/molecules/PaginationList";
import { getProductsByCategorySlug } from "@/api/products";

const capitalizeFirstLetter = (phrase: string) => {
	return phrase
		.toLowerCase()
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
	};

export const generateMetadata = async ({
	params,
}: {
	params: { category: string; pagination: string };
}): Promise<Metadata> => {

	const category = params.category
	
	return {
		title: `${capitalizeFirstLetter(category)}`
	};
};



export default async function ProductsPage({
	params,
}: {
	params: { category: string; pagination: string };
}) {
	const products = await getProductsByCategorySlug(params.category);
	if (!products) {
		throw notFound();
	}
	const category = params.category
	return (
		<section className="sm:max-2-2xl mx-auto max-w-md p-12 sm:py-16 md:max-w-4xl lg:max-w-7xl ">
			<h1 className="text-3xl text-white capitalize mb-5">{category}</h1>
			<ProductList products={products.slice(0, 4)} />
			<PaginationList
				aria-label="Pagination"
				paginationLenght={Math.ceil(products.length / 4)}
				currentPagination={1}
			/>
		</section>
	);
}
