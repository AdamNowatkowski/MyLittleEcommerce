// import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { executeGraphql } from "@/api/graphqlApi";
import { OrdersGetByEmailDocument } from "@/gql/graphql";

export default async function OrdersPage() {
	// Temporarily disabled Clerk
	redirect("/sign-in");
}
