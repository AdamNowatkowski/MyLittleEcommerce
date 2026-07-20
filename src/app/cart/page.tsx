import { formatMoney } from "@/app/utils";
import { IncrementProductQuantity } from "@/app/ui/atoms/IncrementProductQuantity";
import { RemoveButton } from "@/app/ui/atoms/RemoveButton";
import { getCartFromCookies, handlePaymentAction } from "@/api/cart";
import { ProductImage } from "@/app/ui/atoms/ProductImage";

export default async function CartPage() {
	const cart = await getCartFromCookies();

	if (!cart || cart.orderItems.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-24 text-center">
				<h2 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
					Your cart is empty
				</h2>
				<p className="mt-4 text-lg text-gray-400">
					Looks like you haven't added anything to your cart yet.
				</p>
			</div>
		);
	}

	const subtotal = cart.orderItems.reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0);

	return (
		<div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
			<h1 className="text-3xl font-extrabold tracking-tight text-white mb-8">Shopping Cart</h1>
			
			<div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
				<section aria-labelledby="cart-heading" className="lg:col-span-7">
					<h2 id="cart-heading" className="sr-only">
						Items in your shopping cart
					</h2>

					<ul role="list" className="divide-y divide-gray-800 border-b border-t border-gray-800">
						{cart.orderItems.map((item) => {
							if (!item.product) return null;
							return (
								<li key={item.id} className="flex py-6 sm:py-10">
									<div className="flex-shrink-0">
										{item.product.images[0]?.url ? (
											<img
												src={item.product.images[0].url}
												alt={item.product.name}
												className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32 border border-gray-800"
											/>
										) : (
											<div className="h-24 w-24 rounded-md sm:h-32 sm:w-32 bg-gray-800 flex items-center justify-center">
												<span className="text-gray-500 text-xs">No image</span>
											</div>
										)}
									</div>

									<div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
										<div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
											<div>
												<div className="flex justify-between">
													<h3 className="text-sm">
														<span className="font-medium text-gray-200 hover:text-white">
															{item.product.name}
														</span>
													</h3>
												</div>
												<p className="mt-1 text-sm font-medium text-gray-100">
													{formatMoney(item.product.price / 100)}
												</p>
											</div>

											<div className="mt-4 sm:mt-0 sm:pr-9 flex items-center justify-between">
												<IncrementProductQuantity
													quantity={item.quantity}
													itemId={item.id}
												/>
												<div className="absolute right-0 top-0">
													<RemoveButton itemId={item.id} />
												</div>
											</div>
										</div>
									</div>
								</li>
							);
						})}
					</ul>
				</section>

				<section
					aria-labelledby="summary-heading"
					className="mt-16 rounded-lg bg-gray-900 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 border border-gray-800"
				>
					<h2 id="summary-heading" className="text-lg font-medium text-gray-100">
						Order summary
					</h2>

					<dl className="mt-6 space-y-4">
						<div className="flex items-center justify-between">
							<dt className="text-sm text-gray-400">Subtotal</dt>
							<dd className="text-sm font-medium text-gray-200">{formatMoney(subtotal / 100)}</dd>
						</div>
						
						<div className="flex items-center justify-between border-t border-gray-800 pt-4">
							<dt className="flex items-center text-sm text-gray-400">
								<span>Shipping estimate</span>
							</dt>
							<dd className="text-sm font-medium text-gray-200">Free</dd>
						</div>
						
						<div className="flex items-center justify-between border-t border-gray-800 pt-4">
							<dt className="text-base font-medium text-white">Order total</dt>
							<dd className="text-base font-medium text-white">{formatMoney(subtotal / 100)}</dd>
						</div>
					</dl>

					<div className="mt-6">
						<form action={handlePaymentAction}>
							<CheckoutButton />
						</form>
					</div>
				</section>
			</div>
		</div>
	);
}
