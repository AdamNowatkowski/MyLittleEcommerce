import { ImageResponse } from "next/server";
import { notFound } from "next/navigation";
import { getProductById } from "@/api/products";

export const runtime = "edge";

export const alt = "My Little eCommerce Product";

export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

export default async function og({
	params,
}: {
	params: { productId: string };
}) {
	const products = await getProductById(params.productId);
	if (products[0] === undefined) {
		throw notFound();
	}
	const product = products[0];
	if (product.images[0]?.url === undefined) {
		throw notFound();
	}

	const [name, description, image] = [
		product.name,
		product.description,
		product.images[0]?.url,
	];

	return new ImageResponse(
		(
			<div tw="flex h-full w-full flex-col items-center justify-center bg-black">
				<div tw="absolute flex left-15 top-15 flex-col items-start justify-center ">
					<img
						style={{
							objectFit: "cover",
							aspectRatio: "1/1",
						}}
						height={150}
						width={100}

						src={image}
						alt="asd"
					/>
				</div>
				<div tw="flex flex-col">
				<p tw="mt-20 text-6xl font-bold text-white">{name}</p>
				<p tw="mt-12 text-xl font-bold text-white">{description}</p>
				</div>
			</div>
		),
		{
			width: 1200,
			height: 630,
		},
	);
}
