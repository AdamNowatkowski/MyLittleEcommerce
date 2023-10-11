import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: [
		"/",
		"/api/webhook",
		"/search",
		"/cart",
		"/cart/sidebar",
		RegExp("/regulamin"),
		RegExp("/polityka-prywatnosci"),
		RegExp("/categories/(.*)"),
		RegExp("/categories"),
		RegExp("/collections/(.*)"),
		RegExp("/collections"),
		RegExp("/product/(.*)"),
		RegExp("/product"),
		RegExp("/products/(.*)"),
		RegExp("/products"),
	],
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
