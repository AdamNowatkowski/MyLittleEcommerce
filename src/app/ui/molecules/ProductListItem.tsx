import { type ProductItemType } from "@/app/ui/types";
import { ProductCoverImage } from "@/app/ui/atoms/ProductCoverImage";
import { ProductItemDescription } from "@/app/ui/atoms/ProductItemDescription";

type ProductListItemProps = {
	product: ProductItemType;
};

export const ProductListItem = ({product}: ProductListItemProps) => {
	return (
		<li>
		<article>
				<ProductCoverImage {...product.coverImage} />
				<ProductItemDescription product={product} />
		</article>
		</li>
	);
};
