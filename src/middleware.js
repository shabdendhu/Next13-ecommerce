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

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      const path = req.nextUrl.pathname;
      const isAdminPath = adminpath.includes(path);
      if (!token) return false;
      const decodedJwt = jwtDecode(token);
      //check token validity
      const currentTime = Date.now() / 1000;
      if (decodedJwt.exp < currentTime) return false;
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
    ...adminpath,
  ],
};
