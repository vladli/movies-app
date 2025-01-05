"use client";
import React from "react";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { useRouter } from "@/i18n/routing";


export default function PageBack() {
    const t = useTranslations();
    const router = useRouter();
    return (
        <motion.button
            className="absolute left-2 top-2 z-20 select-none font-medium"
            onClick={() => router.back()}
        >
            <motion.div
                className="flex items-center"
                whileHover={{x: -3}}
            >
                <MdOutlineKeyboardDoubleArrowLeft size="1.1rem"/>
                {t("#ROOT.ButtonBack")}
            </motion.div>
        </motion.button>
    );
}
