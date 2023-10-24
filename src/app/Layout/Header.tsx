"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import useToggle from "@/hooks/useToggle";

export default function Header() {
  const { data: session } = useSession();
  const [visible, toggle] = useToggle();
  return (
    <header className="relative font-medium">
      <nav className="relative flex h-[4rem] items-center bg-background text-foreground">
        <Link
          className="relative left-4"
          href="/"
        >
          Logo
        </Link>
        <ul className="absolute left-1/2 hidden -translate-x-1/2 gap-4 lg:flex">
          <li>Title</li>
          <li>Title2</li>
          <li>Title3</li>
          <li>Title4</li>
          <li>Title5</li>
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
      <nav className="fixed bottom-0 z-50 h-[3rem] opacity-90 bg-content2 w-full lg:hidden">
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
              className="fixed bottom-[3rem] w-full bg-content2 p-4 border-b border-foreground-200"
              exit={{ opacity: 0 }}
              initial={{ opacity: 1, y: 10 }}
              transition={{ type: "keyframes" }}
            >
              <li>1</li>
              <li>2</li>
              <li>2</li>
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
