"use client";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { TMenu } from "@/lib/data";
import { cn } from "@/lib/utils";

const MenuItemMobile = React.memo(({ url, name, children }: TMenu) => {
  const [toggled, setToggled] = useState<string | null>(null);
  const pathname = usePathname();

  const handleToggle = () => {
    if (toggled === null) setToggled(name);
    else setToggled(null);
  };

  const isActive = pathname === url;

  return (
    <motion.li>
      {url ? (
        <Link
          className="relative p-1"
          href={url}
        >
          {isActive && (
            <motion.span
              className="absolute inset-0 border-b border-foreground"
              layoutId="active"
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 30,
              }}
            />
          )}
          {name}
        </Link>
      ) : (
        <div className="flex flex-col items-center">
          <span
            className="flex cursor-pointer items-center gap-1"
            onClick={handleToggle}
          >
            {name}
            <motion.span
              animate={{ rotate: toggled ? 90 : 0 }}
              initial={{ rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <IoIosArrowForward />
            </motion.span>
          </span>
          <AnimatePresence>
            {children && toggled && (
              <motion.ul
                animate={{ opacity: 1, height: "auto" }}
                className={cn("left-10 relative flex flex-col gap-2")}
                exit={{ opacity: 0, height: 0 }}
                initial={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                {children.map(({ url, name }) => (
                  <MenuItemMobile
                    key={name}
                    name={name}
                    url={url}
                  />
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.li>
  );
});

export default MenuItemMobile;
