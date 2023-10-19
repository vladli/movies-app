"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="relative">
      <nav className="relative flex h-[4rem] items-center bg-content1 text-foreground">
        <div className="relative left-4">Logo</div>
        <ul className="absolute left-1/2 flex -translate-x-1/2 gap-4">
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
    </header>
  );
}
