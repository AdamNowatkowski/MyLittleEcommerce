import Link from "next/link";
import { type ProductItemType } from "@/app/ui/types";
import { ProductCoverImage } from "@/app/ui/atoms/ProductCoverImage";
import { ProductItemDescription } from "@/app/ui/atoms/ProductItemDescription";

type ProductListItemProps = {
	product: ProductItemType;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<li>
			<Link href={`/product/${product.id}`}>
				<article>
					<ProductCoverImage {...product.coverImage} />
					<ProductItemDescription product={product} />
				</article>
			</Link>
		</li>
	);
};
