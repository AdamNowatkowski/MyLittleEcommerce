import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Stripe } from "stripe";
import { getProductById } from "./products";
import {
	CartGetByIdDocument,
	CartCreateDocument,
	type CartFragment,
	CartAddProductDocument,
} from "@/gql/graphql";

import { executeGraphql } from "@/api/graphqlApi";

export async function getOrCreateCart(): Promise<CartFragment> {
	const existingCart = await getCartFromCookies();
	if (existingCart) {
		return existingCart;
	}

	const cart = await createCart();
	if (!cart.createOrder) {
		throw new Error("createOrder not found");
	}
	cookies().set("cartId", cart.createOrder.id, {
		httpOnly: true,
		sameSite: "lax",
		// secure: true,
	});
	return cart.createOrder;
}

export async function getCartById(cartId: string) {
	return executeGraphql({
		query: CartGetByIdDocument,
		variables: { id: cartId },
		cache: "no-store"
	});
}

export async function getCartFromCookies() {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		const cart = await executeGraphql({
			query: CartGetByIdDocument,
			variables: { id: cartId },
			next: { tags: ["cart"] },
			cache: "no-store",
		});
		if (cart.order) {
			return cart.order;
		}
	}
}

export function createCart() {
	return executeGraphql({
		query: CartCreateDocument,
		variables: {},
		cache: "no-store",
	});
}

export async function addToCart(orderId: string, productId: string) {
	const products = await getProductById(productId);
	if (products[0] === undefined) {
		throw notFound();
	}
	const product = products[0];

	if (!product) {
		throw new Error("Product not Found");
	}

	return executeGraphql({
		query: CartAddProductDocument,
		variables: {
			orderId,
			productId,
			total: product.price,
		},
		cache: "no-store",
	});
}


export async function handlePaymentAction() {
	"use server";
	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Missing Stripe secret key");
	}

	const cart = await getCartFromCookies();

	if (!cart) {
		return;
	}
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-08-16",
		typescript: true,
	});

	const checkoutSession = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		metadata: {
			cartId: cart.id,
		},
		line_items: cart.orderItems.map((item) => ({
			price_data: {
				currency: "usd",
				product_data: {
					name: item.product?.name || "",
				},
				unit_amount: (item.product?.price || 777),
			},
			quantity: item.quantity,
			
		})),
		mode: "payment",
		success_url: "https://my-little-ecommerce-adamnowatkowski.vercel.app/cart/success?sessionId={CHECKOUT_SESSION_ID}",
		cancel_url: "https://my-little-ecommerce-adamnowatkowski.vercel.app/cart/cancel",
	});

	if(!checkoutSession.url) {
		throw new Error("Missing checkout session url");
	}
	cookies().set("cartId", "");
	redirect(checkoutSession.url);
}