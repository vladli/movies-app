import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
    async jwt({ token, user, profile }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  // pages: {
  //   signIn: "/auth/signin",
  // },
};
