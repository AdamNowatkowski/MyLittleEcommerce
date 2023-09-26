import { Search } from "lucide-react";
import { executeGraphql } from "@/api/graphqlApi";

import {
	ProductsGetByCategorySlugDocument,
	ProductsGetListDocument,
	ProductGetByIdDocument,
	ColectionsGetListDocument,
	ProductsGetByCollectionSlugDocument,
	ProductGetVariantsListDocument,
	type ProductListItemFragment,
	ProductsGetBySearchDocument,
} from "@/gql/graphql";

export const getProductsList = async () => {
	const qraphqlResponse = await executeGraphql(
		ProductsGetListDocument,
		{},
	);

	return qraphqlResponse.products;
};

export const getProductById = async (
	id: ProductListItemFragment["id"],
) => {
	{
		const qraphqlResponse = await executeGraphql(ProductGetByIdDocument, {
			id: id,
		});
		return qraphqlResponse.products;
	}
};

export const getProductsByCategorySlug = async (category: string) => {
	const qraphqlResponse = await executeGraphql(
		ProductsGetByCategorySlugDocument,
		{
			slug: category,
		},
	);
	const products = qraphqlResponse.categories[0]?.products;

	return products;
};

export const getProductsByCollectionSlug = async (collection: string) => {
	const qraphqlResponse = await executeGraphql(
		ProductsGetByCollectionSlugDocument,
		{
			slug: collection,
		},
	);
	const products = qraphqlResponse.collections[0]?.products;

	return products;
};

export const getCollectionsList = async () => {
	const qraphqlResponse = await executeGraphql(
		ColectionsGetListDocument,
		{},
	);

	return qraphqlResponse.collections;
};

export const getVariants = async (id: string) => {
	const qraphqlResponse = await executeGraphql(
		ProductGetVariantsListDocument,
		{ id: id },
	);

	return qraphqlResponse.product?.variants;
};

export const getSearchProducts = async (search: string) => {
	const qraphqlResponse = await executeGraphql(
		ProductsGetBySearchDocument,
		{ search: search },
	);

	return qraphqlResponse.products;
};
