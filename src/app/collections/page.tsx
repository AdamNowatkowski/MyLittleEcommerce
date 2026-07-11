import { redirect } from "next/navigation";
import { type Metadata } from "next/types";


export default async function EmptyPage() {
	redirect("/");
}
