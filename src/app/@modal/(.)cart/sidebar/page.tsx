import { redirect } from "next/navigation";
import { Overlay } from "@/app/ui/atoms/Overlay";
import { getCartFromCookies } from "@/api/cart";
import { formatMoney } from "@/app/utils";
import NextImage from "next/image";
import Link from "next/link";

export default async function ModalCart() {
	const cart = await getCartFromCookies();
	if (!cart?.orderItems) return redirect("/");

	const total = cart.orderItems.reduce(
		(sum, item) => sum + (item.product?.price || 0) * item.quantity,
		0
	);

	return (
		<>
			<Overlay />
			<div className="absolute right-0 top-0 z-40 flex h-screen w-full max-w-md flex-col bg-white text-black shadow-xl">
				<div className="flex items-center justify-between border-b p-6">
					<h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
				</div>

				<div className="flex-1 overflow-y-auto p-6">
					<ul className="divide-y divide-gray-200">
						{cart.orderItems.map((item) => item.product && (
							<li key={item.id} className="flex py-6">
								<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
									{item.product.images?.[0]?.url ? (
										<NextImage
											src={item.product.images[0].url}
											alt={item.product.name}
											width={96}
											height={96}
											className="h-full w-full object-cover object-center"
										/>
									) : (
										<div className="flex h-full w-full items-center justify-center bg-gray-100">
											<span className="text-xs text-gray-400">No image</span>
										</div>
									)}
								</div>

								<div className="ml-4 flex flex-1 flex-col">
									<div>
										<div className="flex justify-between text-base font-medium text-gray-900">
											<h3>{item.product.name}</h3>
											<p className="ml-4">{formatMoney(item.product.price)}</p>
										</div>
									</div>
									<div className="flex flex-1 items-end justify-between text-sm">
										<p className="text-gray-500" data-testid="quantity">Qty {item.quantity}</p>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>

				<div className="border-t border-gray-200 px-6 py-6">
					<div className="flex justify-between text-base font-medium text-gray-900">
						<p>Subtotal</p>
						<p>{formatMoney(total)}</p>
					</div>
					<p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
					<div className="mt-6">
						<Link
							href="/cart"
							className="flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800"
						>
							View Cart & Checkout
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
