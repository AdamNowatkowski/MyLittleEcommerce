import { ProductList } from "./ui/organisms/ProductList";
import { type ProductItemType } from "./ui/types";

const products: ProductItemType[] = [
	{
		id: "1",
		category: "Kubki",
		productName: "Kubeczek Z Brzydkim Zdjęciem",
		price: 10000000,
		coverImage: {
			alt: "Zdjęcie kubeczka",
			src: "/product_1.png",
		},
	},
	{
		id: "2",
		category: "Koszulki",
		productName: "Koszulka Czarna",
		price: 20000000,
		coverImage: {
			alt: "Zdjęcie czarnej koszulki",
			src: "/product_2.png",
		},
	},
	{
		id: "3",
		category: "Koszulki",
		productName: "Koszulka Biała",
		price: 30000000,
		coverImage: {
			alt: "Zdjęcie białej koszulki",
			src: "/product_3.png",
		},
	},
	{
		id: "4",
		category: "Czapki",
		productName: "Czapka Czarna Zimowa",
		price: 40000000,
		coverImage: {
			alt: "Zdjęcie czarnej czapki",
			src: "/product_4.png",
		},
	},
];

export default function Home() {
	return (

			<ProductList products={products} data-testid="products-list"/>

	);
}
