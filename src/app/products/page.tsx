import { ProductList } from "../ui/organisms/ProductList";
import { type ProductItemType } from "../ui/types";

const products: ProductItemType[] = [
	{
		id: "1",
		category: "Kubki",
		productName: "Kubeczek Z Brzydkim Zdjęciem",
		price: 10000,
		coverImage: {
			alt: "Zdjęcie kubeczka",
			src: "/product_1.png",
		},
	},
	{
		id: "2",
		category: "Koszulki",
		productName: "Koszulka Czarna",
		price: 20000,
		coverImage: {
			alt: "Zdjęcie czarnej koszulki",
			src: "/product_2.png",
		},
	},
	{
		id: "3",
		category: "Koszulki",
		productName: "Koszulka Biała",
		price: 30000,
		coverImage: {
			alt: "Zdjęcie białej koszulki",
			src: "/product_3.png",
		},
	},
	{
		id: "4",
		category: "Czapki",
		productName: "Czapka Czarna Zimowa",
		price: 40000,
		coverImage: {
			alt: "Zdjęcie czarnej czapki",
			src: "/product_4.png",
		},
	},
];

export default function Home() {
	return (
		<section className="sm:max-2-2xl mx-auto max-w-md p-12 sm:py-16 md:max-w-4xl lg:max-w-7xl ">
			<ProductList products={products} />
		</section>
	);
}
