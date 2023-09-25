import {
	ProductsGetByCategorySlugDocument,
	ProductsGetListDocument,
	ProductGetByIdDocument,
	ColectionsGetListDocument,
	ProductsGetByCollectionSlugDocument
} from "../gql/graphql";
import { executeGraphql } from "./graphqlApi";

export const getProductsList = async () => {
	const qraphqlResponse = await executeGraphql(ProductsGetListDocument, {});

	return qraphqlResponse.products;
};

export const getProductById = async (id: string) => {
	{
		const qraphqlResponse = await executeGraphql(ProductGetByIdDocument, { id: id });
		return qraphqlResponse.products;
	}
};

export const getProductsByCategorySlug = async (category: string) => {
	const qraphqlResponse = await executeGraphql(ProductsGetByCategorySlugDocument, {
		slug: category,
	});
	const products = qraphqlResponse.categories[0]?.products;

	return products
};

export const getProductsByCollectionSlug = async (collection: string) => {
	const qraphqlResponse = await executeGraphql(ProductsGetByCollectionSlugDocument, {
		slug: collection,
	});
	const products = qraphqlResponse.collections[0]?.products;

	return products
};

export const getCollectionsList = async () => {
	const qraphqlResponse = await executeGraphql(ColectionsGetListDocument, {});

	return qraphqlResponse.collections;
};