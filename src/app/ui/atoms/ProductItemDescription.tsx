import { type ProductItemType } from "@/app/ui/types";
import {formatMoney} from "@/app/utils";

type ProductItemDescription = {
	product: ProductItemType;
};

export const ProductItemDescription = ({product: {category, productName, price}}: ProductItemDescription) => {
	return (
		<div className="mt-2 flex justify-between">
			<div>
				<h3 className="text-sm font-semibold">{productName}</h3>
				<p className="text-sm">
					<span className="sr-only">Kategoria</span>{category}
				</p>
			</div>
			<p className="text-sm font-medium">
				<span className="sr-only">Cena:</span>{formatMoney(price / 100)}
			</p>
		</div>
	);
};
