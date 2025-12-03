import { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";


const intlMiddleware = createMiddleware(routing);

const authMiddleware = withAuth(
    function onSuccess(req) {
        return intlMiddleware(req);
    },
    {
        callbacks: {
            authorized: ({token}) => token != null,
        },
        pages: {
            signIn: "/auth/login",
        },
    }
);
const privatePages = ["/profile"];

export default function proxy(req: NextRequest) {
    const privatePathnameRegex = RegExp(
        `^(/(${routing.locales.join("|")}))?(${privatePages.join("|")})/?$`,
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
