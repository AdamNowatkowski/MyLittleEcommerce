import { notFound } from "next/navigation";
import { type Metadata } from "next/types";
import { PaginationList } from "@/app/ui/molecules/PaginationList";
import { ProductList } from "@/app/ui/organisms/ProductList";
import { getProductsByCategorySlug } from "@/api/products";


// export const generateStaticParams = async ({
// 	params,
// }: {
// 	params: { category: string };
// }) => {
// 	if (params.category === "t-shirts") {
// 		return [{ pageNumber: "1" }, { pageNumber: "2" }];
// 	} else if (params.category === "hoodies") {
// 		return [{ pageNumber: "1" }];
// 	} else if (params.category === "accessories") {
// 		return [{ pageNumber: "1" }];
// 	} else {
// 		return [];
// 	}
// };

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


export default async function CategoryProductPage({
	params,
}: {
	params: { category: string; pagination: string };
}) {
	const products = await getProductsByCategorySlug(params.category);
	if (!products) {
		throw notFound();
	}
	const paginationValidation =
		parseInt(params.pagination) > Math.ceil(products.length) / 4 ||
		parseInt(params.pagination) <= 0 ||
		isNaN(parseInt(params.pagination));

	if (paginationValidation) {
		throw notFound();
	}

	return (
		<section className="sm:max-2-2xl mx-auto max-w-md p-12 sm:py-16 md:max-w-4xl lg:max-w-7xl ">
			<h1 className="mb-5 capitalize">{capitalizeFirstLetter(params.category)}</h1>
			<ProductList products={products} pagination={params.pagination} />
			<PaginationList
				aria-label="pagination1"
				paginationLenght={Math.ceil(products.length / 4)}
				currentPagination={parseInt(params.pagination)}
			/>
		</section>
	);
}
