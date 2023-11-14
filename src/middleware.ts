import { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";

import { locales } from "@/navigation";

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "en",
});

const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/auth/login",
    },
  }
);
const privatePages = ["/profile"];

export default function middleware(req: NextRequest) {
  const privatePathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${privatePages.join("|")})/?$`,
    "i"
  );
  const isPrivatePage = privatePathnameRegex.test(req.nextUrl.pathname);

  if (isPrivatePage) {
    return (authMiddleware as any)(req);
  } 
    return intlMiddleware(req);
  
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
