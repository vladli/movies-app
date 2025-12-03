"use client";

import { useState } from "react";
import { HeroUIProvider } from "@heroui/react";
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
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <HeroUIProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
          >
            {children}
          </ThemeProvider>
        </HeroUIProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
