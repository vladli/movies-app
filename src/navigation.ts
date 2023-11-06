import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "kr", "ru"] as const;

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });
