export default async function SingleProductPage({
	params,
    searchParams,
}: {
	params: { productId: string };
    // searchParams: URLSearchParams;
    searchParams: { [key:string]: string | string[] };
}) {
    const refferal = searchParams.refferal.toString();
    // const product = await getProductById(params.productId);
	return (
		<div>
			{/* <SingleProductTemplate product={product}> */}
            <div>{params.productId}</div>
            <div>{refferal}</div>
		</div>
	);
}
