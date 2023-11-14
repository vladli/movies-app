import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "kr", "ru"] as const;

export type TLocales = "en" | "kr" | "ru";

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });
