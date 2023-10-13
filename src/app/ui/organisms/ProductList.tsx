"use client";

import { useState } from 'react';
import { type ProductListItemFragment } from "@/gql/graphql";
import { ProductListItem } from "@/app/ui/molecules/ProductListItem";

export const ProductList = ({
	products, pagination
}: {
	products: ProductListItemFragment[], pagination: string;
}) => {
	const [sorting, setSorting] = useState('default');

	if (!pagination) {
		return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <ProductListItem key={product.id} product={product} />
                ))}
            </div>
        );
	}
	let paginatedProducts = products.slice(
		parseInt(pagination) * 4 - 4,
		parseInt(pagination) * 4,
	)
	if (sorting === 'price') {
		paginatedProducts = products.sort((a, b) => {
            if (a.price < b.price) {
                return 1;
            }
            if (a.price > b.price) {
                return -1;
            }
            return 0;
        }).slice(
            parseInt(pagination) * 4 - 4,
            parseInt(pagination) * 4,
        );
	}

	if (sorting === 'rating') {
		paginatedProducts = products.sort((a, b) => {
			if (a.avgRating == null) { a.avgRating = 0}
			if (b.avgRating == null) { b.avgRating = 0}
            if (a.avgRating < b.avgRating) {
                return 1;
            }
            if (a.avgRating > b.avgRating) {
                return -1;
            }
            return 0;
        }).slice(
            parseInt(pagination) * 4 - 4,
            parseInt(pagination) * 4,
        );
    }


	// const paginatedProducts = products.slice(
	// 	parseInt(pagination) * 4 - 4,
	// 	parseInt(pagination) * 4,
	// );

	return (
		<div>
			Sorting
			<select 
			className="block w-1/5 p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg 
			bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
			 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			 value={sorting}
			 onChange={e => setSorting(e.target.value)}
			 >
				
				<option value="default">Default</option>
                <option value="price" data-testid="sort-by-price">Price</option>
				<option value="rating" data-testid="sort-by-rating">Rating</option>
			</select>
			{/* <h1 className='text-6xl mt-5 mb-5'>{sorting}</h1> */}
			<ul
				className="grid grid-cols-1 gap-8 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
				data-testid="products-list"
			>
				{paginatedProducts.map((product) => {
					return <ProductListItem key={product.id} product={product} />
				})}
			</ul>
		</div>
	);
};
