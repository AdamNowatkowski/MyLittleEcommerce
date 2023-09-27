/// <reference types="stripe-event-types" />

// import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest): Promise<Response> {
	if (!process.env.STRIPE_WEBHOOK_SECRET) {
		throw new Error("Missing Stripe Webhook Secret");
	}
	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Missing Stripe secret key");
	}
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-08-16",
		typescript: true,
	});

	const signature = request.headers.get("stripe-signature");

	if (!signature) {
		return new Response("No signature", { status: 401 });
	}

	const event = stripe.webhooks.constructEvent(
		await request.text(),
		signature,
		process.env.STRIPE_WEBHOOK_SECRET,
	) as Stripe.DiscriminatedEvent;

	switch (event.type) {
		case "checkout.session.completed": {
            console.dir(event, { depth: 999 });
			event.data.object.metadata?.cartId;
		}
        case "checkout.session.async_payment_succeeded": {
            event.data.object.metadata?.cartId;
        }
        case "checkout.session.expired": {
            event.data.object.metadata?.cartId;
        }
        case "checkout.session.async_payment_failed": {
            event.data.object.metadata?.cartId;
        }
	}
    return new Response("OK", { status: 204 });
}
