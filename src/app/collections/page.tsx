import { redirect } from "next/navigation";
import { type Metadata } from "next/types";

export const generateMetadata = async ({
	params,
}: {
	params: { collection: string; pagination: string };
}): Promise<Metadata> => {
	const collection = params.collection;

	return {
		title: `${collection}`,
		description: `${collection} - My Little Ecommerce`,
	};
};

export default async function EmptyPage() {
	redirect("/");
}
