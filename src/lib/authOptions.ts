import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import VkProvider from "next-auth/providers/vk";
import YandexProvider from "next-auth/providers/yandex";

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
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID!,
      clientSecret: process.env.YANDEX_CLIENT_SECRET!,
    }),
    VkProvider({
      clientId: process.env.VK_CLIENT_ID!,
      clientSecret: process.env.VK_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
};
