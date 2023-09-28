"use client"
export default function ErrorPage({error }: {error: Error & {digest: string}}) {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<div className="h-12 w-12 animate-bounce bg-red-500">ERROR {error.digest}</div>
		</div>
	);
}
