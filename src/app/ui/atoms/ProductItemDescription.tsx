import { formatMoney } from "@/app/utils";
import { getFragmentData, type FragmentType } from "@/gql/fragment-masking";
import { graphql } from "@/gql/gql";

const ProductItemDescription_Product = graphql(/* GraphQL */ `
	fragment ProductItemDescription_Product on Product {
		name
		categories(first: 1) {
			name
		}
		price
	}
`);

type ProductItemDescriptionProps = {
	product: FragmentType<typeof ProductItemDescription_Product>;
};

export const ProductItemDescription = (props: ProductItemDescriptionProps) => {
	// if (categories === undefined) throw new Error("Product must have at least one category");
	const { name, categories, price } = getFragmentData(
		ProductItemDescription_Product,
		props.product,
	);
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
			<p className="px-3 text-sm font-medium">
				<span className="sr-only ">Cena:</span>
				{formatMoney(price / 100)}
			</p>
		</div>
	);
};
