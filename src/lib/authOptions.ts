import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";

import { prisma } from "@/lib/prisma";

import { sendVerificationRequest } from "./resend";

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
      if (account?.provider === "kakao") {
        //@ts-ignore
        if (user.image !== profile.kakao_account.profile.profile_image_url) {
          await prisma.user.update({
            where: { id: user.id }, //@ts-ignore
            data: { image: profile.kakao_account.profile.profile_image_url },
          });
        }
      }
      return true;
    },
    async jwt({ token, user, session, profile, trigger }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
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
        session.user.favoriteMovies = token.favoriteMovies;
      }
      return session;
    },
  },
  providers: [
    EmailProvider({
      sendVerificationRequest,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/auth/login",
    verifyRequest: "/auth/verify-request",
  },
};
