import Link from "next/link";
import { ProductCounter } from "../ui/atoms/ProductCounter";
import { TestServer } from "../ui/atoms/TestServer";

export default async function Page() {
	return (
		<div>
			<Link href="/test2" className="hover:underline">
				przejdz do test 2 przez Link
			</Link>
			<div>
				<a href="/test2" className="hover:underline">
					przejdz do test 2 przez a
				</a>
			</div>
			<ProductCounter>
				<TestServer />
			</ProductCounter>
		</div>
	);
}
