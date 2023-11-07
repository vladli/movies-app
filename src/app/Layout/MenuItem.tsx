"use client";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { TMenu } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";

const MenuItem = React.memo(({ url, name, children }: TMenu) => {
  const pathname = usePathname();
  const t = useTranslations();
  const [hover, setHoveredItem] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const handleItemHover = (label: string) => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    setHoveredItem(label);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    timeoutRef.current = window.setTimeout(() => {
      setHoveredItem(null);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const isHovered = hover === name;
  const isActive = pathname === url;

  return (
    <motion.li
      className="group"
      onHoverEnd={handleMouseLeave}
      onHoverStart={() => handleItemHover(name)}
    >
      {url ? (
        <Link
          className="relative p-1 transition-colors hover:text-foreground-500"
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
          {t(name)}
        </Link>
      ) : (
        <span className="cursor-pointer">{t(name)}</span>
      )}
      <AnimatePresence>
        {children && isHovered && (
          <motion.ul
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "absolute top-8 flex flex-col gap-2 bg-content2 p-3 rounded-lg"
            )}
            exit={{ opacity: 0, y: -10 }}
            initial={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {children.map(({ url, name }) => (
              <MenuItem
                key={name}
                name={name}
                url={url}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.li>
  );
});

export default MenuItem;
