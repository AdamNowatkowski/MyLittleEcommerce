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
	const qraphqlResponse = await executeGraphql({
		query: ProductsGetListDocument,
		variables: {},
		next: {
			revalidate: 15
		}
	});

	return qraphqlResponse.products;
};

export const getProductById = async (
	id: ProductListItemFragment["id"],
) => {
	{
		const qraphqlResponse = await executeGraphql({
			query: ProductGetByIdDocument,
			variables: {
				id: id,
			},
			next: {
				revalidate: 5
			}
		});
		return qraphqlResponse.products;
	}
};

export const getProductsByCategorySlug = async (category: string) => {
	const qraphqlResponse = await executeGraphql({
		query: ProductsGetByCategorySlugDocument,
		variables: {
			slug: category,
		},
	});
	const products = qraphqlResponse.categories[0]?.products;

	return products;
};

export const getProductsByCollectionSlug = async (collection: string) => {
	const qraphqlResponse = await executeGraphql({
		query: ProductsGetByCollectionSlugDocument,
		variables: {
			slug: collection,
		},
	});
	const products = qraphqlResponse.collections[0]?.products;

	return products;
};

export const getCollectionsList = async () => {
	const qraphqlResponse = await executeGraphql({
		query: ColectionsGetListDocument,
		variables: {},
	});

	return qraphqlResponse.collections;
};

export const getVariants = async (id: string) => {
	const qraphqlResponse = await executeGraphql({
		query: ProductGetVariantsListDocument,
		variables: { id: id },
	});

	return qraphqlResponse.product?.variants;
};

export const getSearchProducts = async (search: string) => {
	const qraphqlResponse = await executeGraphql({
		query: ProductsGetBySearchDocument,
		variables: { search: search },
	});

	return qraphqlResponse.products;
};
