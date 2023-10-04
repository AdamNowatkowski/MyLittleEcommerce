import { currentUser } from "@clerk/nextjs";
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
		return <div>User does not have email</div>;
	}

	const data = await executeGraphql({
		query: OrdersGetByEmailDocument,
		variables: {
			email,
		},
	});
	const orders = data?.orders;

	return (
		<div>
		  <h1>{user.firstName}&rsquo;s Orders</h1>
	 
		  {(orders.length === 0 || !orders || orders === undefined) ? (
			<div>No orders found</div>
		  ) : (
			<table>
				<thead>
				<tr>
				  <th>Order ID</th>
				  <th>Order Date</th>
				  <th>Order Status</th>
				  <th>Order Total</th>
				</tr>
			  </thead>
			  <tbody>
				{orders.map((order) => (
				  <tr key={order.id}>
					<td>{order.id}</td>
					{/* <td>{order.createdAt}</td> */}
					<td>{order.stage}</td>
					<td>{order.total}</td>
				  </tr>
				))}
			  </tbody>
			</table>
		  )}
		</div>
	)

	  
	}
