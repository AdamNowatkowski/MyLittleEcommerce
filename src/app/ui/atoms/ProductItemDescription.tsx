import { formatMoney } from "@/app/utils";
import { type ProductListItemFragment } from "@/gql/graphql";

type ProductItemDescriptionProps = {
	product: ProductListItemFragment;
};

export const ProductItemDescription = ({
	product: { name, categories, price, avgRating },
}: ProductItemDescriptionProps) => {
	return (
		<div className="mt-2 flex justify-between">
			<div>
				<h3 className="text-sm font-semibold">{name}</h3>
				{categories[0] && (
					<p className="mt-1 text-sm">
						<span className="sr-only">Kategoria</span>
						{categories[0].name}
					</p>
				)}
			</div>
			<div>
				<p className="px-3 text-sm font-medium">
					<span className="sr-only ">Cena:</span>
					<span data-testid="product-price">{formatMoney(price / 100)}</span>
				</p>
				<p className="px-3 text-sm font-medium">
					<span data-testid="product-rating">{avgRating && avgRating.toFixed(1)}</span><span>/5.0</span>
				</p>
			</div>
		</div>
	);
};
