import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/shop",
    "/product/:id",
    "/contact-us",
    "/about-technaija",
    "/api/webhook/clerk",
    "/api/webhook/paystack/route.ts",
  ],
  ignoredRoutes: ["/api/webhook/clerk", "/api/webhook/paystack"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
