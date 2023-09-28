export default async function BlogPage({
	params,
}: {
	params: { pathname: string[] };
}) {
    const pathname = params.pathname?.join('/');
    // await new Promise((_, reject) => setTimeout(reject, 5000));

    //     const pathname = params.pathname.join('/') ?? []; //optional chaining
    return (
        <div>
            <div>Blog {pathname}</div>
        </div>
    )
}
