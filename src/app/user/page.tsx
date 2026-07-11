// import { UserProfile, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function UserPage() {
	redirect("/sign-in");
}
