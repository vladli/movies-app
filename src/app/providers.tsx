"use client";

import { useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export default function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <NextUIProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
          >
            {children}
          </ThemeProvider>
        </NextUIProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
