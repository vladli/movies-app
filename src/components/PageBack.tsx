"use client";
import React from "react";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function PageBack() {
  const t = useTranslations();
  const router = useRouter();
  return (
    <motion.button
      className="absolute left-2 top-2 z-50 font-medium"
      onClick={() => router.back()}
    >
      <motion.div
        className="flex items-center"
        whileHover={{ x: -3 }}
      >
        <MdOutlineKeyboardDoubleArrowLeft size="1.1rem" />
        {t("#ROOT.ButtonBack")}
      </motion.div>
    </motion.button>
  );
}
