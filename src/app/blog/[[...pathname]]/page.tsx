export default async function BlogPage({
	params,
}: {
	params: { pathname: string[] };
}) {
    const pathname = params.pathname?.join('/');
    //     const pathname = params.pathname.join('/') ?? []; //optional chaining
    return (
        <div>
            <div>Blog {pathname}</div>
        </div>
    )
}
