"use client";
import { useState, useTransition } from "react";
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
  const [selectedKeys, setSelectedKeys] = useState(new Set([locale]));
  const [isPending, startTransition] = useTransition();
  const defaultLanguage = locales.find(({ value }) => value === locale)?.flag;

  function onLanguageChange(language: string) {
    startTransition(() => {
      router.replace(pathname, { locale: language.toString() });
    });
  }

  return (
    <Dropdown className="!min-w-0">
      <DropdownTrigger>
        <Avatar
          as="button"
          className="transition-transform"
          isDisabled={isPending}
          name={defaultLanguage}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Language"
        disallowEmptySelection
        onAction={(key) => onLanguageChange(key as string)}
        onSelectionChange={setSelectedKeys as any}
        selectedKeys={selectedKeys}
        selectionMode="single"
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
