/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation CartAddProduct($productId: ID!, $orderId: ID!, $total: Int!) {\n  createOrderItem(\n    data: {product: {connect: {id: $productId}}, order: {connect: {id: $orderId}}, quantity: 1, total: $total}\n  ) {\n    id\n  }\n}": types.CartAddProductDocument,
    "mutation CartCreate {\n  createOrder(data: {total: 0}) {\n    ...Cart\n  }\n}": types.CartCreateDocument,
    "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    ...Cart\n  }\n}": types.CartGetByIdDocument,
    "fragment Cart on Order {\n  id\n  orderItems {\n    id\n    quantity\n    product {\n      id\n      name\n      price\n    }\n  }\n}": types.CartFragmentDoc,
    "mutation CartRemoveProduct($itemId: ID!) {\n  deleteOrderItem(where: {id: $itemId}) {\n    id\n  }\n}": types.CartRemoveProductDocument,
    "mutation CartSetProductQuantity($itemId: ID!, $quantity: Int!) {\n  updateOrderItem(where: {id: $itemId}, data: {quantity: $quantity}) {\n    id\n  }\n}": types.CartSetProductQuantityDocument,
    "fragment CollectionSingle on Collection {\n  id\n  name\n  slug\n  description\n  image {\n    url\n  }\n}": types.CollectionSingleFragmentDoc,
    "query ColectionsGetList {\n  collections(first: 3) {\n    ...CollectionSingle\n  }\n}": types.ColectionsGetListDocument,
    "query OrdersGetByEmail($email: String!) {\n  orders(where: {email: $email}) {\n    id\n    total\n    createdAt\n    stage\n    orderItems {\n      id\n      quantity\n      total\n      product {\n        name\n        price\n        images {\n          url\n        }\n      }\n    }\n  }\n}": types.OrdersGetByEmailDocument,
    "query ProductGetById($id: ID!) {\n  products(where: {id: $id}) {\n    id\n    name\n    description\n    categories(first: 1) {\n      name\n    }\n    images(first: 1) {\n      url\n    }\n    price\n    reviews {\n      rating\n    }\n  }\n}": types.ProductGetByIdDocument,
    "query ProductGetVariantsList($id: ID!) {\n  product(where: {id: $id}) {\n    variants {\n      ... on ProductColorVariant {\n        ...SingleProductColorVariant\n      }\n      ... on ProductSizeColorVariant {\n        ...SingleProductSizeColorVariant\n      }\n      ... on ProductSizeVariant {\n        ...SingleProductSizeVariant\n      }\n    }\n  }\n}": types.ProductGetVariantsListDocument,
    "fragment ProductListItem on Product {\n  id\n  name\n  description\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    url\n  }\n  price\n  reviews {\n    rating\n  }\n}": types.ProductListItemFragmentDoc,
    "query ProductsGetByCategorySlug($slug: String!) {\n  categories(where: {slug: $slug}) {\n    products(first: 20) {\n      ...ProductListItem\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductsGetByCollectionSlug($slug: String!) {\n  collections(where: {slug: $slug}) {\n    products(first: 20) {\n      ...ProductListItem\n    }\n  }\n}": types.ProductsGetByCollectionSlugDocument,
    "query ProductsGetBySearch($search: String!) {\n  products(where: {_search: $search}, first: 20) {\n    ...ProductListItem\n  }\n}": types.ProductsGetBySearchDocument,
    "query ProductsGetList {\n  products(first: 20) {\n    ...ProductListItem\n  }\n}": types.ProductsGetListDocument,
    "mutation ReviewCreate($email: String!, $name: String!, $headline: String!, $productId: ID!, $rating: Int!, $content: String!) {\n  createReview(\n    data: {email: $email, headline: $headline, name: $name, rating: $rating, content: $content, product: {connect: {id: $productId}}}\n  ) {\n    id\n  }\n}": types.ReviewCreateDocument,
    "fragment SingleProductSizeColorVariant on ProductSizeColorVariant {\n  id\n  name\n}\n\nfragment SingleProductColorVariant on ProductColorVariant {\n  id\n  name\n}\n\nfragment SingleProductSizeVariant on ProductSizeVariant {\n  id\n  name\n}": types.SingleProductSizeColorVariantFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartAddProduct($productId: ID!, $orderId: ID!, $total: Int!) {\n  createOrderItem(\n    data: {product: {connect: {id: $productId}}, order: {connect: {id: $orderId}}, quantity: 1, total: $total}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').CartAddProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartCreate {\n  createOrder(data: {total: 0}) {\n    ...Cart\n  }\n}"): typeof import('./graphql').CartCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    ...Cart\n  }\n}"): typeof import('./graphql').CartGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Cart on Order {\n  id\n  orderItems {\n    id\n    quantity\n    product {\n      id\n      name\n      price\n    }\n  }\n}"): typeof import('./graphql').CartFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartRemoveProduct($itemId: ID!) {\n  deleteOrderItem(where: {id: $itemId}) {\n    id\n  }\n}"): typeof import('./graphql').CartRemoveProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartSetProductQuantity($itemId: ID!, $quantity: Int!) {\n  updateOrderItem(where: {id: $itemId}, data: {quantity: $quantity}) {\n    id\n  }\n}"): typeof import('./graphql').CartSetProductQuantityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CollectionSingle on Collection {\n  id\n  name\n  slug\n  description\n  image {\n    url\n  }\n}"): typeof import('./graphql').CollectionSingleFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ColectionsGetList {\n  collections(first: 3) {\n    ...CollectionSingle\n  }\n}"): typeof import('./graphql').ColectionsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query OrdersGetByEmail($email: String!) {\n  orders(where: {email: $email}) {\n    id\n    total\n    createdAt\n    stage\n    orderItems {\n      id\n      quantity\n      total\n      product {\n        name\n        price\n        images {\n          url\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').OrdersGetByEmailDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  products(where: {id: $id}) {\n    id\n    name\n    description\n    categories(first: 1) {\n      name\n    }\n    images(first: 1) {\n      url\n    }\n    price\n    reviews {\n      rating\n    }\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetVariantsList($id: ID!) {\n  product(where: {id: $id}) {\n    variants {\n      ... on ProductColorVariant {\n        ...SingleProductColorVariant\n      }\n      ... on ProductSizeColorVariant {\n        ...SingleProductSizeColorVariant\n      }\n      ... on ProductSizeVariant {\n        ...SingleProductSizeVariant\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductGetVariantsListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductListItem on Product {\n  id\n  name\n  description\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    url\n  }\n  price\n  reviews {\n    rating\n  }\n}"): typeof import('./graphql').ProductListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategorySlug($slug: String!) {\n  categories(where: {slug: $slug}) {\n    products(first: 20) {\n      ...ProductListItem\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCollectionSlug($slug: String!) {\n  collections(where: {slug: $slug}) {\n    products(first: 20) {\n      ...ProductListItem\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCollectionSlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetBySearch($search: String!) {\n  products(where: {_search: $search}, first: 20) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductsGetBySearchDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList {\n  products(first: 20) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ReviewCreate($email: String!, $name: String!, $headline: String!, $productId: ID!, $rating: Int!, $content: String!) {\n  createReview(\n    data: {email: $email, headline: $headline, name: $name, rating: $rating, content: $content, product: {connect: {id: $productId}}}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').ReviewCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment SingleProductSizeColorVariant on ProductSizeColorVariant {\n  id\n  name\n}\n\nfragment SingleProductColorVariant on ProductColorVariant {\n  id\n  name\n}\n\nfragment SingleProductSizeVariant on ProductSizeVariant {\n  id\n  name\n}"): typeof import('./graphql').SingleProductSizeColorVariantFragmentDoc;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
