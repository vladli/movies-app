"use client";
import React, { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Button, Skeleton } from "@nextui-org/react";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const switchTheme = theme === "light" ? "dark" : "light";

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted)
    return <Skeleton className="h-10 w-10 rounded-medium"></Skeleton>;
  return (
    <Button
      isIconOnly
      radius="full"
      onClick={() => setTheme(switchTheme)}
    >
      {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
    </Button>
  );
}
