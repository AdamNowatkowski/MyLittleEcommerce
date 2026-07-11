import Link from "next/link";

export default function EmptyPage() {
	return (
		<div className="flex flex-col items-center justify-center py-24 text-center">
			<h1 className="text-3xl font-bold tracking-tight text-white mb-4">Product Not Found</h1>
			<p className="text-gray-400 mb-8 max-w-md">
				It looks like you've landed on a product page without selecting a specific product. 
				Please browse our catalog to find what you're looking for.
			</p>
			<Link 
				href="/products" 
				className="rounded-md bg-[#0b237d] px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-800"
			>
				Browse Products
			</Link>
		</div>
	);
}