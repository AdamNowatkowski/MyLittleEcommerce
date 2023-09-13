export default async function BlogPage({
	params: { date, slug },
}: {
	params: { date: string; slug: string };
}) {
    //     const pathname = params.pathname.join('/') ?? []; //optional chaining
    return (
        <div>
            <div>Date {date}</div>
            <div>Slug {slug}</div>
        </div>
    )
}
