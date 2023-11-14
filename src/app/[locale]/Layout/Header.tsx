"use client";
import { useEffect } from "react";
import { Button } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import Logo from "@/components/Logo";
import useToggle from "@/hooks/useToggle";
import { menu } from "@/lib/data";
import { Link } from "@/navigation";

import MenuItem from "./MenuItem";
import MenuItemMobile from "./MenuItemMobile";
import Search from "./Search";
import UserMenu from "./UserMenu";

export default function Header() {
  const t = useTranslations();
  const { data: session } = useSession();
  const [visible, toggle] = useToggle();
  useEffect(() => {
    if (visible) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [visible]);

  return (
    <header className="relative z-50 select-none font-medium">
      {visible && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed z-50 h-screen w-screen bg-black/50"
          initial={{ opacity: 0 }}
          onClick={toggle}
        />
      )}
      <nav className="relative flex h-[4rem] items-center bg-background text-foreground">
        <Logo className="p-4" />
        <ul className="absolute left-1/2 hidden -translate-x-1/2 gap-4 lg:flex">
          {menu.map(({ url, name, children }) => (
            <MenuItem
              key={name}
              {...{ url, name, children }}
            />
          ))}
        </ul>
        <div className="absolute right-4 flex items-center gap-2">
          <Search />
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
      </nav>
      <nav className="fixed bottom-0 z-50 h-12 w-full bg-content2 opacity-90 lg:hidden">
        <motion.div
          animate={{ opacity: 1 }}
          className="flex h-full w-full cursor-pointer select-none items-center justify-center"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={toggle}
        >
          {!visible ? "Menu" : "X"}
        </motion.div>
        <AnimatePresence>
          {visible && (
            <motion.ul
              animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-[3rem] flex w-full flex-col items-center gap-2 border-b border-foreground-200 bg-content2 p-1"
              exit={{ opacity: 0 }}
              initial={{ opacity: 1, y: 10 }}
              transition={{ type: "keyframes" }}
            >
              {menu.map(({ url, name, children }) => (
                <MenuItemMobile
                  key={name}
                  {...{ toggle, url, name, children }}
                />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
