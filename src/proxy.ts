import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

const clerk = clerkMiddleware();

export const proxy = async (req: NextRequest, event: NextFetchEvent) => {
	try {
		return await clerk(req, event);
	} catch (error) {
		console.error("Middleware/Proxy Invocation Failed:", error);
		// Zabezpieczenie przed 500: INTERNAL_SERVER_ERROR z Vercel/Amplify
		return NextResponse.next();
	}
};

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};
