import { type ComponentType } from "react";
import { notFound } from "next/navigation";

export default async function StaticPage({
	params,
}: {
	params: { filename: string };
}) {
	const Page = await import(`./${params.filename}.mdx`).then(
		(module: { default: ComponentType }) => module.default,
		() => notFound,
	);
	return (
	<article className="prose prose-lg ">
		<Page />
	</article>
    );
}
