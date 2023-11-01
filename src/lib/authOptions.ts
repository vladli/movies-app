import { PrismaAdapter } from "@auth/prisma-adapter";
import { verify } from "argon2";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";

import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  debug: false,
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        //@ts-ignore
        if (user.image !== profile?.picture) {
          await prisma.user.update({
            where: { id: user.id }, //@ts-ignore
            data: { image: profile?.picture },
          });
        }
      }
      return true;
    },
    async jwt({ token, user, session, profile, trigger }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.provider = user.provider;
        token.favoriteMovies = user.favoriteMovies;
      }
      if (trigger === "update") {
        token.favoriteMovies = session.favoriteMovies;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.provider = token.provider;
        session.user.favoriteMovies = token.favoriteMovies;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      id: "emailAuth",
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      //@ts-ignore
      async authorize(credentials: any) {
        const user = await prisma.user.findUnique({
          where: {
            provider: "email",
            email: credentials.email,
          },
        });
        if (!user) {
          throw new Error("Please check your email and password");
        }

        const isValidPassword = user.password
          ? await verify(user.password, credentials.password)
          : false;
        if (!isValidPassword) {
          throw new Error("Please check your email and password");
        }
        return user;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID as string,
      clientSecret: process.env.NAVER_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
};
