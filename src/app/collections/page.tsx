import { redirect } from "next/navigation";

export default async function EmptyPage () {
    redirect("/");
}