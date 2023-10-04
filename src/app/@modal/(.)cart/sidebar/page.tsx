import { redirect } from "next/navigation";
import { Overlay } from "@/app/ui/atoms/Overlay";
import { getCartFromCookies } from "@/api/cart";

export default async function ModalCart() {
	const cart = await getCartFromCookies();
	if (!cart?.orderItems) return redirect("/");

	return (
		<>
			<Overlay />
			<div className="absolute right-0 top-0 z-40 h-screen w-full max-w-sm bg-white text-black">
				<ul>
					{cart?.orderItems.map((item) => (
						<li key={item.id}>{item.product?.name}</li>
					))}
				</ul>
			</div>
		</>
	);
}
