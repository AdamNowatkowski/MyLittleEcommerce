import { Suspense } from "react";
import { notFound } from "next/navigation";
import { type Metadata } from "next/types";
import { getProductById, getProductsList } from "@/api/products";
import { ProductImage } from "@/app/ui/atoms/ProductImage";
import { SuggestedProductsList } from "@/app/ui/organisms/SuggestedProducts";
import { formatMoney } from "@/app/utils";

export const generateStaticParams = async () => {
	const products = await getProductsList();
	return products.map((product?) => ({
		productId: product.id as string,
	}));
};

export const generateMetadata = async ({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> => {
	const products = await getProductById(params.productId);
	if (products[0] === undefined)
		{ throw notFound;}
	const product = products[0];
	if (product.images[0]?.url === undefined)
		{ throw notFound;}
	const [name, image] = [product.name, product.images[0]?.url];

	if (!product) {
		throw notFound;
	}
	return {
		title: `${name} - My Little Ecommerce`,
		description: `${name}`,
		openGraph: {
			title: `${name} - My Little Ecommerce`,
			description: "Product page description",
			images: [image],
		},
	};
};

export default async function SingleProductPage({
	params, // searchParams,
}: {
	params: { productId: string };
	// searchParams: URLSearchParams;
	// searchParams: { [key:string]: string | string[] };
}) {
	// const refferal = searchParams.refferal.toString();
	const products = await getProductById(params.productId);
	if (products[0] === undefined)
		{ throw notFound;}
	const product = products[0]
	if (product.images[0]?.url === undefined)
		{ throw notFound;}
	return (
		<>
			<article className="">
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<ProductImage src={product.images[0]?.url} alt='' />
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
						</div>
						<div className="mt-6 flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								className="h-5 w-5 flex-shrink-0 "
								aria-hidden="true"
							>
								<path d="M18 6 7 17l-5-5"></path>
								<path d="m22 10-7.5 7.5L13 16"></path>
							</svg>
							<p className="ml-1 text-sm font-semibold ">In stock</p>
						</div>
						<div className="mt-8">
							<button
								type="submit"
								data-testid="add-to-cart-button"
								className="inline-flex h-14 w-full items-center justify-center rounded-md from-[#1e4b65] from-20% via-[#010315] to-[#0b237d] to-80% px-6 text-base font-medium leading-6 text-white shadow transition duration-150 ease-in-out enabled:bg-gradient-to-r hover:enabled:brightness-125 disabled:cursor-wait disabled:bg-gray-300"
							>
								Add to cart
							</button>
						</div>
					</div>
				</div>
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
