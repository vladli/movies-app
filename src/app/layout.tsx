import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions";

import BottomTools from "./Layout/BottomTools";
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

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const session = await getServerSession(authOptions);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
    >
      <body className={`${inter.className} relative`}>
        <Providers session={session}>
          {children} <BottomTools />
        </Providers>
        <Toaster toastOptions={{ className: "react-toast" }} />
      </body>
    </html>
  );
}
