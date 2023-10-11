import { redirect } from "next/navigation";
import { Overlay } from "@/app/ui/atoms/Overlay";
import { getCartFromCookies } from "@/api/cart";
import { formatMoney } from "@/app/utils";

export default async function ModalCart() {
	const cart = await getCartFromCookies();
	if (!cart?.orderItems) return redirect("/");

	return (
		<>
			<Overlay />
			<div className="absolute right-0 top-0 z-40 h-screen w-full max-w-sm bg-white text-black">
			<table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
					<thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th className="px-6 py-3">Product</th>
							<th className="text-center">Quantity</th>
							<th className="px-6 py-3">Price</th>
						</tr>
					</thead>
					<tbody>
						{cart.orderItems.map(
							(item) =>
								item.product && (
									<tr
										key={item.id}
										className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
									>
										<td className="px-6 py-4">{item.product.name}</td>
										<td className="text-center">{item.quantity}</td>
										<td className="text-center">{item.quantity * item.product?.price}</td>
										{/* <td className="text-center">
											<IncrementProductQuantity
												quantity={item.quantity}
												itemId={item.id}
											/>
										</td> */}

										<td>{formatMoney(item.product.price)}</td>

									</tr>
								),
						)}
					</tbody>
				</table>
			</div>
		</>
	);
}
