import { type ProductItemType } from "../app/ui/types";

type ProductResponseItem = {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    rating: {
        rate: number;
        count: number;
    };
    image: string;
    longDescription: string;
};

export const getProductsList = async () => {
	const res = await fetch("https://naszsklep-api.vercel.app/api/products");


	const productsResponse = (await res.json()) as ProductResponseItem[];

	const products = productsResponse.map(productResponseItemToProductItemType);
	return products;
};

export const getProductById = async (id: ProductResponseItem['id']) => {
    const res = await fetch(`https://naszsklep-api.vercel.app/api/products/${id}`)
    const productResponse = (await res.json()) as ProductResponseItem; 
    
    return productResponseItemToProductItemType(productResponse)
}

const productResponseItemToProductItemType = (product: ProductResponseItem): ProductItemType => {
    return {
			id: product.id,
			productName: product.title,
			price: product.price * 1000,
			category: product.category,
			coverImage: {
				alt: product.title,
				src: product.image,
			},
            description: product.description,
        
    }
    
}