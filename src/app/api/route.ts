// import { headers } from 'next/headers'
 
// export async function POST(request: Request) {
//   const headersList = headers()
//   const referer = headersList.get('referer')
 
//   console.log(request)
//   return new Response('Hello, Next.js!', {
//     status: 200,
//     headers: { referer: referer },
//   })
// }

import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
	const json: unknown = await request.json();

	if (
		typeof json === "object" &&
		json &&
		"productId" in json &&
		typeof json.productId === "string"
	) {
		// console.log(`Revalidating ${json.productId}...`);
		revalidatePath(`/product/${json.productId}`);
        revalidatePath(`/products`);

		return NextResponse.json({}, { status: 200 });
	}

	return NextResponse.json({ message: "Invalid body" }, { status: 400 });
}
