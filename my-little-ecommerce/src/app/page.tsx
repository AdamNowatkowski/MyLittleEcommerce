import { ProductCoverImage } from "./ui/atoms/ProductCoverImage";

export default function Home() {
	return (
<section className="mx-auto max-w-md p-12 sm:max-2-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl " >
    <ul className="grid grid-cols-1 gap-8 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <li>
            <article>
                <div className="aspect-square overflow-hidden rounded-md border bg-slate-50 hover:bg-slate-100 ">
                    <ProductCoverImage src="/product_1.png" alt="kubek" />
                </div>
            </article>
        </li>
    </ul>
</section>
	);
}
