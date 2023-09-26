"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { type Route } from "next";
import { useCallback } from "react";
import {
	type SingleProductColorVariantFragment,
	type SingleProductSizeColorVariantFragment,
	type SingleProductSizeVariantFragment,
} from "@/gql/graphql";

type SingleProductVariantProps = {
	variants:
		| SingleProductColorVariantFragment[]
		| SingleProductSizeColorVariantFragment[]
		| SingleProductSizeVariantFragment[]
		| undefined;
};

export const Variants = ({ variants }: SingleProductVariantProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams()!;

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);
			params.set(name, value);

			return params.toString();
		},
		[searchParams],
	);

	return (
		<div className="bg-black">
			{variants && variants.length > 0 && (
				<select
					className="bg-black"
					name="variants-size"
					id="variants-size-id"
					value={searchParams.get("variant") || "Size/Color"}
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onChange={(event) =>
						router.push(
							`${pathname}?${createQueryString(
								"variant",
								event.target.value,
							)}` as Route,
						)
					}
				>
					<option disabled className="">
						Variants
					</option>
					{variants.map((v) => (
						<option key={v.id} value={v.name}>
							{v.name}
						</option>
					))}
				</select>
			)}
		</div>
	);
};
