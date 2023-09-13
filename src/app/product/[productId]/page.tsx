import { Suspense } from "react";
import { type Metadata } from "next/types";
import { getProductById, getProductsList } from "@/api/products";
import { ProductCoverImage } from "@/app/ui/atoms/ProductCoverImage";
import { ProductItemDescription } from "@/app/ui/atoms/ProductItemDescription";
import { SuggestedProductsList } from "@/app/ui/organisms/SuggestedProducts";

export const generateStaticParams = async () => {
	const products = await getProductsList();
	return products.map((product) => ({
		productId: product.id,
	}));
};

export const generateMetadata = async ({params}: {params: {productId : string}}): Promise<Metadata> => {
	const product = await getProductById(params.productId);
	return {
		title: `${product.productName} - My Little Ecommerce`,
		description: "Product page description",
		openGraph: {
			title: `${product.productName} - My Little Ecommerce`,
			description: "Product page description",
			images: [product.coverImage.src],
		},
	}
}


export default async function SingleProductPage({
	params, // searchParams,
}: {
	params: { productId: string };
	// searchParams: URLSearchParams;
	// searchParams: { [key:string]: string | string[] };
}) {
	// const refferal = searchParams.refferal.toString();
	const product = await getProductById(params.productId);
	return (
		<>
			<article className="max-w-xs">
				<ProductCoverImage {...product.coverImage} />
				<ProductItemDescription product={product} />
			</article>
			<aside>
				<h2 className="mt-3">Suggested Products</h2>
				<Suspense fallback="Ładowanie ...">
					<SuggestedProductsList />
				</Suspense>
			</aside>
		</>
	);
}
