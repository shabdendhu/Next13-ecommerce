import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail";

  // const token = request.cookies.get("token")?.value;
  const token =
    process.env.NODE_ENV === "development"
      ? request.cookies.get("next-auth.session-token")
      : request.cookies.get("__Secure-next-auth.session-token") ||
        request.cookies.get("next-auth.session-token");

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/account",
    "/address",
    "/my-ratings-reviews",
    "/mywishlist",
    "/profile-hub",
    "/rating-reviews",
    "/savedcard",
    "/saveupi",
    "/basket",
  ],
};
