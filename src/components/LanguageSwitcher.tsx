"use client";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";

const locales = [
  {
    name: "English",
    value: "en",
    flag: "🇺🇸",
  },
  {
    name: "한국어",
    value: "kr",
    flag: "🇰🇷",
  },
  {
    name: "Русский",
    value: "ru",
    flag: "🇷🇺",
  },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const defaultLanguage = locales.find(({ value }) => value === locale)?.flag;
  return (
    <Dropdown className="!min-w-0">
      <DropdownTrigger>
        <Avatar
          as="button"
          className="transition-transform"
          name={defaultLanguage}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Language"
        onAction={(key) => {
          router.replace(pathname, { locale: key.toString() });
        }}
        variant="faded"
      >
        {locales.map(({ name, value, flag }) => (
          <DropdownItem
            key={value}
            startContent={flag}
          >
            {name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
