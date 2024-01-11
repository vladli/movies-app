"use client";
import { useState } from "react";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { TMenu } from "@/lib/data";
import { Link, usePathname } from "@/navigation";

const MenuItemMobile = React.memo(
  ({ setIsMenuOpen, url, name, submenu }: TMenu) => {
    const t = useTranslations();
    const [toggled, setToggled] = useState<string | null>("all");
    const pathname = usePathname();
    const handleToggle = () => {
      if (toggled === null) setToggled(name);
      else setToggled(null);
    };

    const isActive = pathname === url;

    return (
      <motion.div>
        {!submenu!.length ? (
          <Link
            className="relative p-1"
            href={url}
            onClick={() => setIsMenuOpen!(false)}
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
          <div className="flex flex-col p-1">
            <span
              className="flex cursor-pointer items-center gap-1"
              onClick={handleToggle}
            >
              {t(name)}
              <motion.span
                animate={{ rotate: toggled ? 90 : 0 }}
                initial={{ rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <IoIosArrowForward />
              </motion.span>
            </span>
            <AnimatePresence>
              {submenu.length > 0 && toggled && (
                <motion.ul
                  animate={{ opacity: 1, height: "auto" }}
                  className="relative left-4 flex list-disc flex-col gap-2"
                  exit={{ opacity: 0, height: 0 }}
                  initial={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {submenu.map(({ url, name }) => (
                    <MenuItemMobile
                      key={name}
                      name={name}
                      setIsMenuOpen={setIsMenuOpen}
                      submenu={[]}
                      url={url}
                    />
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    );
  }
);

export default MenuItemMobile;
