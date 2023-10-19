"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export default function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
