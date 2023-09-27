// import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

// export const runtime = "edge";
// export const dynamic = true;
// export const dynamicParams = true;
// export const revalidate = 20
// export const fetchCache = "force-cache"

export async function GET(_request: NextRequest): Promise<Response> {
	return NextResponse.json(Math.random());

	//     return new Response(JSON.stringify('Hello, world!'),{
	//     headers: {
	//         'content-type': "application/json"
	//     },
	//     status:200

	// })
}
