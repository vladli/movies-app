"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import Logo from "@/components/Logo";
import useToggle from "@/hooks/useToggle";
import { menu } from "@/lib/data";
import { cn } from "@/lib/utils";

import MenuItem from "./MenuItem";
import MenuItemMobile from "./MenuItemMobile";

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [visible, toggle] = useToggle();
  const [hover, setHover] = useState<string | null>(null);
  const hoverEnd = () => {
    setTimeout(() => {
      setHover(null);
    }, 1000);
  };
  return (
    <header className="relative z-50 select-none font-medium">
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
        <div className="absolute right-4">
          {!session ? (
            <Button
              as={Link}
              color="primary"
              href="/auth/login"
            >
              Sign In
            </Button>
          ) : (
            <Button
              color="secondary"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          )}
        </div>
      </nav>
      <nav className="fixed bottom-0 z-50 h-[3rem] w-full bg-content2 opacity-90 lg:hidden">
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
                  {...{ url, name, children }}
                />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
