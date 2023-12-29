import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { apiGet } from "@/helpers/api";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig/connection";
import { NextRequest, NextResponse } from "next/server";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req: any) {
        connect();
        const { email, password } = credentials;
        //check if user exists
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error(`This user does not exist.`);
        }

        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
          throw new Error("Wrong credentials. Try again.");
        }
        user.id = JSON.stringify(user._id);
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.JWT_SECRET,

  callbacks: {
    async jwt({ token, user, session }: any) {
      if (user) {
        token.id = user?._id || user?.id;
        token.role = user?.role;
        token.username = user?.username;
        token.orders = user?.orders;
        token.favorites = user?.favorites;
      }

      return token;
    },
    async session({ session, token, user }: any) {
      const encodedToken = jwt.sign(token, process.env.JWT_SECRET || "", {
        algorithm: "HS256",
      });
      session.accessToken = encodedToken;
      // if (token.id) {
      // session.user.id = token.id;
      // session.user.username = token.username;
      // session.user.role = token.role;
      // session.user.favorites = token.favorites;
      // session.user.orders = token.orders;
      // }
      const newsessionObj = { ...session.user, ...token };
      session.user = newsessionObj;
      return session;
    },
    async signIn({ user, profile }: any) {
      connect();
      if (profile?.email) {
        const userRes = await User.findOne({ email: profile?.email });
        if (!userRes) {
          const newUser: any = await User.create({
            email: profile?.email,
            username: profile?.given_name,
            profile: {
              name: profile?.name,
              avatar: profile?.picture,
            },
          });
          user.id = newUser?._id;
        } else {
          user.id = userRes?._id;
        }
      }

      //check if user exists
      return true;
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,

    encode: async ({ secret, token }) => {
      const jwtClaims = {
        id: token?.id,
        userRole: token?.role,
        name: token?.name,
        email: token?.email,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      };
      const encodedToken = jwt.sign(jwtClaims, secret, { algorithm: "HS256" });

      return encodedToken;
    },
    decode: ({ secret, token }: any): any => {
      return jwt.verify(token, secret, { algorithms: ["HS256"] });
    },
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
