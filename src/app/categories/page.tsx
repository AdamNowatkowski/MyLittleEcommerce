import { redirect } from "next/navigation";
import { type Metadata } from "next/types";

const capitalizeFirstLetter = (phrase: string) => {
	return phrase
		.toLowerCase()
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
	};

export const generateMetadata = async ({
	params,
}: {
	params: { category: string; pagination: string };
}): Promise<Metadata> => {

	const category = params.category
	
	return {
		title: `${capitalizeFirstLetter(category)}`
	};
};



export default async function EmptyPage () {
    redirect("/");
}