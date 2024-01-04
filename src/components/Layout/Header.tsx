"use client";
import { useState } from "react";
import {
  Button,
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import Logo from "@/components/Logo";
import { menu } from "@/lib/data";
import { Link } from "@/navigation";

import MenuItem from "./MenuItem";
import MenuItemMobile from "./MenuItemMobile";
import Search from "./Search";
import UserMenu from "./UserMenu";

export default function Header() {
  const t = useTranslations();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      className=" z-50 select-none font-medium"
      isMenuOpen={isMenuOpen}
      maxWidth="full"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent
        className="lg:hidden"
        justify="start"
      >
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>
      <NavbarContent
        className="flex lg:hidden"
        justify="center"
      >
        <Logo className="p-4" />
      </NavbarContent>
      <NavbarContent
        className="hidden lg:flex"
        justify="start"
      >
        <Logo className="p-4" />
      </NavbarContent>
      <NavbarContent justify="center">
        <ul className="absolute left-1/2 hidden -translate-x-1/2 gap-4 lg:flex">
          {menu.map(({ url, name, children }) => (
            <MenuItem
              key={name}
              {...{ url, name, children }}
            />
          ))}
        </ul>
      </NavbarContent>
      <NavbarContent justify="end">
        <div className="flex items-center gap-2">
          <Search className="hidden lg:flex" />
          {!session ? (
            <Button
              as={Link}
              color="primary"
              href="/auth/login"
            >
              {t("#ROOT.Header.signIn")}
            </Button>
          ) : (
            <UserMenu />
          )}
        </div>
      </NavbarContent>
      <NavbarMenu>
        <Search className="w-full lg:hidden" />
        {menu.map(({ url, name, children }, index) => (
          <NavbarMenuItem key={`${name}-${index}`}>
            <MenuItemMobile {...{ setIsMenuOpen, url, name, children }} />
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
