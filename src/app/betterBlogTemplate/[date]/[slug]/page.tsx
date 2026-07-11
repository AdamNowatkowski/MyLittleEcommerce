export default async function BlogPage({
	params,
}: {
	params: Promise<{ date: string; slug: string }>;
}) {
	const { date, slug } = await params;
    //     const pathname = params.pathname.join('/') ?? []; //optional chaining
    return (
        <div>
            <div>Date {date}</div>
            <div>Slug {slug}</div>
        </div>
    )
}
