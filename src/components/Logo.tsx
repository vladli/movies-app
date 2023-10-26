import React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function Logo({ className }: Props) {
  return (
    <div className={cn("w-[12rem]", className)}>
      <Link href="/">
        <Image
          alt=""
          className="block dark:hidden"
          height={200}
          priority
          src="/logo.png"
          width={400}
        />
        <Image
          alt=""
          className="hidden dark:block"
          height={200}
          priority
          src="/logo_dark.png"
          width={400}
        />
      </Link>
    </div>
  );
}