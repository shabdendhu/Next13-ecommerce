// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;

//   const isPublicPath =
//     path === "/login" || path === "/signup" || path === "/verifyemail";

//   // const token = request.cookies.get("token")?.value;
//   const token =
//     process.env.NODE_ENV === "development"
//       ? request.cookies.get("next-auth.session-token")
//       : request.cookies.get("__Secure-next-auth.session-token") ||
//         request.cookies.get("next-auth.session-token");

//   if (isPublicPath && token) {
//     return NextResponse.redirect(new URL("/", request.nextUrl));
//   }

//   if (!isPublicPath && !token) {
//     return NextResponse.redirect(new URL("/login", request.nextUrl));
//   }
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: [
//     "/account",
//     "/address",
//     "/my-ratings-reviews",
//     "/mywishlist",
//     "/profile",
//     "/rating-reviews",
//     "/savedcard",
//     "/saveupi",
//     "/basket",
//   ],
// };

import { withAuth } from "next-auth/middleware";
import { jwtDecode } from "jwt-decode";

const adminpath = [
  "/product-manager",
  "/category-manager",
  "/banner-manager",
  "/admin-dashboard",
  "/order-manager",
  "/user-manager",
  "/product-suggestion-manager",
];

export default withAuth(function middleware(request) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      const path = req.nextUrl.pathname;
      const isAdminPath = adminpath.includes(path);
      if (!token) return false;
      const decodedJwt = jwtDecode(token);

      if (isAdminPath) {
        return decodedJwt?.role === "admin";
      }

      return !!token;
    },
  },
  pages: {
    signIn: "/login",
    error: "/error",
    newUser: "/signup",
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    decode: ({ secret, token }) => {
      return token;
    },
  },
});

export const config = {
  matcher: [
    "/account",
    "/address",
    "/my-ratings-reviews",
    "/mywishlist",
    "/profile",
    "/rating-reviews",
    "/savedcard",
    "/saveupi",
    "/basket",
    "/product-manager",
  ],
};
