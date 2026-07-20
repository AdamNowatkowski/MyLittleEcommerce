import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { executeGraphql } from "@/api/graphqlApi";
import { OrdersGetByEmailDocument } from "@/gql/graphql";

export default async function OrdersPage() {
	const user = await currentUser();
	if (!user) {
		redirect("/sign-in");
	}

	const email = user.emailAddresses[0]?.emailAddress;
	if (!email) {
		return <div className="py-12">No email found for user.</div>;
	}

	const { orders } = await executeGraphql({
		query: OrdersGetByEmailDocument,
		variables: { email },
	});

	return (
		<div className="py-12">
			<h1 className="text-3xl font-bold mb-8">Your Orders</h1>
			{orders.length === 0 ? (
				<p className="text-gray-400">You have no orders yet.</p>
			) : (
				<ul className="space-y-4">
					{orders.map((order) => (
						<li key={order.id} className="bg-gray-900 rounded-lg p-6">
							<p className="font-semibold text-lg mb-2">Order #{order.id.slice(-6)}</p>
							<p className="text-gray-300">Total: ${(order.total / 100).toFixed(2)}</p>
							<p className="text-gray-400 text-sm mt-1">Status: {order.stage}</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
