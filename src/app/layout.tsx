import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions";

import ThemeSwitcher from "./Layout/ThemeSwitcher";
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
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={`${inter.className} relative`}>
        <Providers session={session}>
          {children}
          <ThemeSwitcher />
        </Providers>
        <Toaster toastOptions={{ className: "react-toast" }} />
      </body>
    </html>
  );
}
