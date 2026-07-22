import { Suspense } from "react";
import { notFound } from "next/navigation";
import { type Metadata } from "next/types";
import { AddToCartButton } from "@/app/ui/atoms/AddToCartButton";
import { ProductImage } from "@/app/ui/atoms/ProductImage";
import { VariantsList } from "@/app/ui/molecules/VariantsList";
import { ProductReviewsBar } from "@/app/ui/organisms/ProductReviewsBar";
import { SuggestedProductsList } from "@/app/ui/organisms/SuggestedProducts";
import { formatMoney } from "@/app/utils";
import { getProductById, getProductsList } from "@/api/products";
import { getOrCreateCart, addToCart } from "@/api/cart";
import { revalidatePath } from "next/cache";
import { addToCartActionForm } from "@/app/product/actions";

// export const generateStaticParams = async () => {
// 	const products = await getProductsList();
// 	return products.slice(0, 16).map((product?: { id: string }) => ({
// 		productId: product?.id,
// 	}));
// };

export const generateMetadata = async ({
	params,
}: {
	params: Promise<{ productId: string }>;
}): Promise<Metadata> => {
	const { productId } = await params;
	const products = await getProductById(productId);
	if (products[0] === undefined) {
		throw notFound();
	}
	const product = products[0];
	if (product.description === undefined) {
		throw notFound();
	}
	const [name, description] = [product.name, product.description];

	if (!product) {
		throw notFound();
	}
	return {
		title: `${name} - My Little Ecommerce`,
		description: `${description}`,
		openGraph: {
			title: `${name} - My Little Ecommerce`,
			description: description,
			images: product.images[0]?.url ? [product.images[0].url] : [],
		},
	};
};

export default async function SingleProductPage({
	params,
}: {
	params: Promise<{ productId: string }>;
}) {
	const { productId } = await params;
	const products = await getProductById(productId);
	if (products[0] === undefined) {
		throw notFound();
	}
	const product = products[0];
	if (product.images[0]?.url === undefined) {
		throw notFound();
	}



	const gaItems = [
		{
			item_id: product.id,
			item_name: product.name,
			price: product.price ? product.price / 100 : 0,
			quantity: 1,
		},
	];

	return (
		<>
			<article className="">
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<ProductImage src={product.images[0]?.url} alt="" />
					<div className="px-6">
						<h1 className="flex-auto text-3xl font-bold tracking-tight">
							{product.name}
						</h1>
						<div className="mt-4 flex items-center">
							<p className="text-2xl font-semibold ">
								{formatMoney(product.price / 100)}
							</p>
						</div>
						<div className="mt-4 space-y-6">
							<p className="">{product.description}</p>
							<VariantsList id={productId} />
						</div>

						<div className="mt-6 flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-5 w-5 flex-shrink-0 "
								aria-hidden="true"
							>
								<path d="M18 6 7 17l-5-5"></path>
								<path d="m22 10-7.5 7.5L13 16"></path>
							</svg>
							<p className="ml-1 text-sm font-semibold ">In stock</p>
						</div>
						<div className="mt-8">
							<form action={addToCartActionForm}>
								<input
									type="hidden"
									name="productId"
									value={product.id}
								></input>
								<AddToCartButton
									value={product.price ? product.price / 100 : 0}
									items={gaItems}
								/>
							</form>
						</div>
					</div>
				</div>
			</article>
			<aside>
				<h2 className="mt-3">Suggested Products</h2>
				<Suspense fallback="Ładowanie ...">
					<SuggestedProductsList category={product.categories[0]?.name as string} />
				</Suspense>
			</aside>
			<ProductReviewsBar product={product} />
		</>
	);
}
