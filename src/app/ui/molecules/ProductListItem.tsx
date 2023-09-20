import Link from "next/link";
import { ProductCoverImage } from "@/app/ui/atoms/ProductCoverImage";
import { ProductItemDescription } from "@/app/ui/atoms/ProductItemDescription";
import { type ProductListItemFragment } from "@/gql/graphql";

type ProductListItemProps = {
	product: ProductListItemFragment;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<li>
			<Link href={`/product/${product.id}`}>
				<article>
					{product.images && <ProductCoverImage src={`${product.images[0]?.url}`} alt="" />}
					<ProductItemDescription product={product} />
				</article>
			</Link>
		</li>
	);
};
