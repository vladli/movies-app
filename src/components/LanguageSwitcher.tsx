"use client";
import { usePathname, useRouter } from "@/navigation";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useLocale } from "next-intl";
import { useState } from "react";

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
] as const;

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const defaultLanguage =
    locales.find(({ value }) => value === locale) || locales[0];
  const [selectedKeys, setSelectedKeys] = useState<any>(
    new Set([defaultLanguage.value])
  );

  return (
    <Dropdown className="!min-w-0">
      <DropdownTrigger>
        <Avatar
          as="button"
          className="transition-transform"
          name={defaultLanguage?.flag}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Language"
        onAction={(key) => {
          router.replace(pathname, { locale: key.toString() });
        }}
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
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
