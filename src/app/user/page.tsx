import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function UserPage() {
	const user = await currentUser();
	if (!user) {
		redirect("/sign-in");
	}

	return (
		<div className="py-12">
			<h1 className="text-3xl font-bold mb-8">User Profile</h1>
			<div className="bg-gray-900 rounded-lg p-8">
				<p className="text-xl">Hello, {user.firstName || "User"}!</p>
				<p className="text-gray-400 mt-2">Email: {user.emailAddresses[0]?.emailAddress}</p>
			</div>
		</div>
	);
}
