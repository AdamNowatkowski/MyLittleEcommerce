import { notFound } from "next/navigation";
import { ProductListItem } from "@/app/ui/molecules/ProductListItem";
import { getProductsByCategorySlug } from "@/api/products";


export const SuggestedProductsList = async ({category} :  { category: string }) => {
    const products = await getProductsByCategorySlug(category.toLowerCase())
	if (!products) {
		throw notFound();
	}

    const productslist = products.slice(-4)
    return (
		<ul
			className="grid grid-cols-1 gap-8 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
			data-testid="related-products"
		>
			{productslist.map((product) => {
				return <ProductListItem key={product.id} product={product} />;
			})}
		</ul>
	);
};
