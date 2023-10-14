import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: [
        "/",
        "/:filename",
        "/search",
        "/cart",
        "/cart/sidebar",
        "/categories/:categorySlug/:pageNumber",
        "/collections/:collectionSlug",
        "/collections/:collectionSlug/:pageNumber",
        "/product/:productSlug",
        "/products",
        "/products/:pageNumber",
    ],
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
