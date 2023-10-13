"use client";
import React from "react";
import { Button } from "@nextui-org/react";

export default function Header() {
  return (
    <header className="relative">
      <nav className="relative bg-gra flex h-[4rem] items-center bg-content1 text-foreground">
        <div className="relative left-4">Logo</div>
        <ul className="absolute left-1/2 flex -translate-x-1/2 gap-4">
          <li>Title</li>
          <li>Title2</li>
          <li>Title3</li>
          <li>Title4</li>
          <li>Title5</li>
        </ul>
        <div className="absolute right-4">
          <Button color="primary">Sign In</Button>
        </div>
      </nav>
    </header>
  );
}
