import { revalidateTag } from "next/cache";
import { formatMoney } from "@/app/utils";
import { IncrementProductQuantity } from "@/app/ui/atoms/IncrementProductQuantity";
import { RemoveButton } from "@/app/ui/atoms/RemoveButton";
import { getCartFromCookies, handlePaymentAction } from "@/api/cart";

export default async function CartPage() {
	const cart = await getCartFromCookies();

	if (!cart) {
		return (
			<div>
				Cart Empty
			</div>
		);
	}
	if (cart?.orderItems.length === 0) {
		const cart = await getCartFromCookies()
		return (
			<div>
				Cart Empty or Processing, items in cart
				<span data-testid="quantity">{cart?.orderItems.length}</span>
			</div>
		);
	}
	return (
		<div>
			={" "}
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
					<thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th className="px-6 py-3">Product</th>
							<th className="text-center">Quantity</th>
							<th className="px-6 py-3">Price</th>
							<th className="text-center">Remove</th>
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
										<td className="text-center">
											<IncrementProductQuantity
												quantity={item.quantity}
												itemId={item.id}
											/>
										</td>

										<td>{formatMoney(item.product.price)}</td>
										<td className="text-center">
											<RemoveButton itemId={item.id} />
										</td>
									</tr>
								),
						)}
					</tbody>
				</table>
			</div>
			<form action={handlePaymentAction}>
				<button
					type="submit"
					className="mb-2 mr-2 mt-3 rounded-lg border border-gray-800 object-right px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-800"
				>
					Pay
				</button>
			</form>
		</div>
	);
}
