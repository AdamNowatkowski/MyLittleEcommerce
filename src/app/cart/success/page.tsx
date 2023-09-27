import { redirect } from "next/navigation";
import { Stripe } from "stripe";

export default async function CartSuccessPage({
	searchParams,
}: {
	searchParams: { sessionId: string };
}) {
	if (!searchParams.sessionId) {
		redirect("/");
	}

	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Missing Stripe secret key");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-08-16",
		typescript: true,
	});

	const session = await stripe.checkout.sessions.retrieve(
		searchParams.sessionId,
	);

	return (
		<div className="">
			<h2 >Payment status: <span className="font-bold text-green-500">{session.payment_status}</span></h2>
			<h3>Thanks for trust and buying at My-Little-Ecommerce</h3>
		</div>
	);
}
