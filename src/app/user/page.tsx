import { UserProfile, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function UserPage() {
	const user = await currentUser();
	if (!user) {
		redirect("/sign-in");
	}
	return (
		<div>
			<div className="mb-3 mt-2 text-2xl">
				<Link href={"/orders"}>
					<h1>{user.firstName}&rsquo;s Orders Link</h1>
				</Link>
			</div>
			<div className="flex items-center justify-center">
				<UserProfile />
			</div>
		</div>
	);
}
