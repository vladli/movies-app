import React from "react";
import {Toaster} from "react-hot-toast";

import type {Metadata} from "next";

import {getServerSession} from "next-auth";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import {Inter} from "next/font/google";
import {notFound} from "next/navigation";
import NextTopLoader from "nextjs-toploader";

import {routing} from "@/i18n/routing";
import {authOptions} from "@/lib/authOptions";

import BottomTools from "../../components/Layout/BottomTools";
import Providers from "./providers";
import "../globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: {
        template: "%s | Movie App",
        default: "Movie App",
    },
    description: "Movie App project created for vladli.dev portfolio.",
};

async function Session({children}: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    return <Providers session={session}>{children}</Providers>;
}

export default async function RootLayout(
    props: {
        children: React.ReactNode;
        params: Promise<{ locale: string }>;
    }
) {
    const params = await props.params;
    const {locale} = params;
    const {children} = props;

    if (!routing.locales.includes(locale as any)) notFound();
    const messages = await getMessages();
    return (
        <html
            suppressHydrationWarning
            lang={locale}
        >
        <body className={`${inter.className} relative`}>
        <NextTopLoader showSpinner={false}/>
        <NextIntlClientProvider
            locale={locale}
            messages={messages}
            timeZone="Asia/Seoul"
        >
            <Session>
                {children}
                <BottomTools/>
                <Toaster toastOptions={{className: "react-toast"}}/>
            </Session>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
