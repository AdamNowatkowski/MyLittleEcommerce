import { redirect } from "next/navigation";
import Stripe from "stripe";
import { PurchaseTracker } from "@/app/ui/atoms/PurchaseTracker";

export default async function CartSuccessPage({
	searchParams,
}: {
	searchParams: Promise<{ sessionId: string }>;
}) {
	const params = await searchParams;
	if (!params.sessionId) {
		redirect("/");
	}

	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Missing Stripe secret key");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2026-06-24.dahlia",
		typescript: true,
	});

	const session = await stripe.checkout.sessions.retrieve(
		params.sessionId,
	);

	return (
		<div className="">
			<PurchaseTracker
				transactionId={session.id}
				value={session.amount_total ? session.amount_total / 100 : 0}
				currency={session.currency || "PLN"}
			/>
			<h2 >Payment status: <span className="font-bold text-green-500">{session.payment_status}</span></h2>
			<h3>Thanks for trust and buying at My-Little-Ecommerce</h3>
		</div>
	);
}
