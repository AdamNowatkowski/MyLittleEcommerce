import { notFound } from "next/navigation";
import { ProductList } from "./ProductList";
import { getProductsByCategorySlug } from "@/api/products";

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const SuggestedProductsList = async ({category} :  { category: string }) => {
    // const products = await getProductsList();
    const products = await getProductsByCategorySlug(category.toLowerCase())
	if (!products) {
		throw notFound();
	}
    // await sleep(1000);
    return <ProductList data-testid="related-products" products={products.slice(-4)} />
};