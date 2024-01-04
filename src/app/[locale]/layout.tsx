import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { NextIntlClientProvider, useMessages } from "next-intl";
import NextTopLoader from "nextjs-toploader";

import { authOptions } from "@/lib/authOptions";
import { locales } from "@/navigation";

import BottomTools from "../../components/Layout/BottomTools";

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

async function Session({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return <Providers session={session}>{children}</Providers>;
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) notFound();
  const messages = useMessages();
  return (
    <html
      lang={locale}
      suppressHydrationWarning
    >
      <body className={`${inter.className} relative`}>
        <NextTopLoader showSpinner={false} />
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone="Asia/Seoul"
        >
          <Session>
            {children}
            <BottomTools />
            <Toaster toastOptions={{ className: "react-toast" }} />
          </Session>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
