import { type TypedDocumentString } from "../gql/graphql";

export const executeGraphql = async <TResult, TVariables>({
	query,
	variables,
	next,
	cache
}: {
	query: TypedDocumentString<TResult, TVariables>;
	variables: TVariables;
	next?: NextFetchRequestConfig;
	cache?: RequestCache;
}): Promise<TResult> => {
	if (!process.env.GRAPHQL_URL) {
		throw TypeError("GRAPHQL_URL is not defined");
	}
	const res = await fetch(process.env.GRAPHQL_URL, {
		method: "POST",
		body: JSON.stringify({
			query,
			variables,
		}),
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.HYGRAPH_MUTATION_TOKEN}`,
		},
		next,
		cache,
	});

	type GrahQLResponse<T> =
		| { data?: undefined; errors: { message: string }[] }
		| { data: T; errors?: undefined };
	const qraphqlResponse = (await res.json()) as GrahQLResponse<TResult>;
	
	if (qraphqlResponse.errors) {
		console.log(JSON.stringify(qraphqlResponse, null, 2));
		throw TypeError(`GraphQL error:`, {
			cause: qraphqlResponse.errors[0]?.message,
		});
	}

	return qraphqlResponse.data;
};
