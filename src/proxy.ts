import { type NextRequest, NextResponse } from "next/server";

// TODO: Upgrade @clerk/nextjs to v6+ for React 19 / Next.js 16 compatibility.
// The old authMiddleware API is no longer supported.
// For now, all routes are public. Re-enable Clerk middleware after upgrading.

export default function middleware(_request: NextRequest) {
	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)"],
};
