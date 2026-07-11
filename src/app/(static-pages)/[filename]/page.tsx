import { notFound } from "next/navigation";
import { type ComponentType } from "react";
 
export default async function StaticPage({ params }: { params: Promise<{ filename: string }> }) {
	const { filename } = await params;
	const Content = await import(`./${filename}.mdx`).then(
		(m: { default: ComponentType }) => m.default,
		() => notFound(),
	);
 
	return <Content />;
}