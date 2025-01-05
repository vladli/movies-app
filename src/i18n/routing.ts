import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export type TLocales = "en" | "kr" | "ru";

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['en', 'kr', 'ru'],

    // Used when no locale matches
    defaultLocale: 'en'
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
    createNavigation(routing);