import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { NextIntlClientProvider } from "next-intl";

import { authOptions } from "@/lib/authOptions";

import getRequestConfig from "../../../i18n";
import BottomTools from "../Layout/BottomTools";

import Providers from "./providers";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Movie App",
    default: "Movie App",
  },
  description: "Movie App project created for vladli.dev portfolio.",
};

async function SessionProvider({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <Providers session={session}>
      {children}
      <BottomTools />
    </Providers>
  );
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { messages } = await getRequestConfig({ locale: locale });
  return (
    <html
      lang={locale}
      suppressHydrationWarning
    >
      <body className={`${inter.className} relative`}>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone="Asia/Seoul"
        >
          <SessionProvider>{children}</SessionProvider>
        </NextIntlClientProvider>
        <Toaster toastOptions={{ className: "react-toast" }} />
      </body>
    </html>
  );
}
