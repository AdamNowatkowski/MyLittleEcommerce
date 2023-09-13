export const generateStaticParams = async ({
	params,
}: {
	params: { category: string };
}) => {
	if (params.category === "t-shirts") {
        return [{pageNumber: "1"}, {pageNumber: "2"}];}
    else if (params.category === "jackets") {
        return [{pageNumber: "1"}, {pageNumber: "2"}, {pageNumber: "3"}];}
    else if (params.category === "boots") {
        return [{pageNumber: "1"}];}
    else {
        return [];
    }
};

export default function CategoryProductPage({
	params,
}: {
	params: { category: string; pageNumber: string };
}) {
	return (
		<>
			<h1>Category: {params.category}</h1>
			<h2>Page: {params.pageNumber}</h2>
		</>
	);
}
