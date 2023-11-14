"use client";
import { MdOutlineCalendarMonth, MdOutlinePlace } from "react-icons/md";
import { Button, Chip, useDisclosure } from "@nextui-org/react";
import { motion, Variants } from "framer-motion";
import NextImage from "next/image";
import { useLocale, useTranslations } from "next-intl";

import { TMDB_POSTER_780 } from "@/lib/constants";
import { TActor } from "@/types/types";

import FullBiography from "./FullBiography";

import BackdropImage from "/public/bio.jpg";

const h2: Variants = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0.5 },
};
const h3: Variants = {
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.3 },
  },
  hidden: { opacity: 0, x: -100 },
};

type Props = {
  actor: TActor | undefined;
};

export default function ActorCard({ actor }: Props) {
  const t = useTranslations();
  let locale = useLocale();
  locale = locale === "kr" ? "ko" : locale;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const birthDate = new Date(actor?.birthday as string);

  const birthDateFormat = birthDate.toLocaleString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <section className="relative">
      <div className="absolute left-0 top-0 z-0 h-full w-full select-none">
        <div className="absolute z-10 h-full w-full bg-gradient-to-b from-background via-background/50 to-background" />
        <NextImage
          alt=""
          className="object-cover"
          fill
          priority
          src={BackdropImage}
        />
      </div>
      <div className="relative top-6 flex flex-col items-center justify-around gap-2 p-6 lg:flex-row-reverse lg:items-start">
        <section className="relative max-w-[18rem] select-none">
          <NextImage
            alt=""
            className="rounded-large"
            height={1170}
            src={TMDB_POSTER_780 + actor?.profile_path}
            unoptimized
            width={780}
          />
        </section>
        <motion.section
          animate="visible"
          className="z-10 flex flex-col items-center gap-3 lg:items-start"
          initial="hidden"
        >
          <motion.h2
            className="w-full text-center text-4xl font-bold"
            variants={h2}
          >
            {actor?.name}
          </motion.h2>
          <div className="flex flex-wrap gap-2">
            <Chip
              color="primary"
              startContent={<MdOutlineCalendarMonth size={16} />}
            >
              {birthDateFormat}
            </Chip>
            {actor?.place_of_birth && (
              <Chip
                color="default"
                startContent={<MdOutlinePlace size={16} />}
                variant="faded"
              >
                {actor?.place_of_birth}
              </Chip>
            )}
          </div>
          <motion.div
            className="flex max-w-[32rem] flex-col gap-2 font-medium "
            variants={h3}
          >
            <p className="line-clamp-[10]">
              {actor?.biography || t("Actors.ErrorNoBio")}
            </p>
            {actor?.biography && (
              <Button
                className="font-medium capitalize"
                color="secondary"
                onPress={onOpen}
              >
                {t("Actors.ButtonFullBio")}
              </Button>
            )}
          </motion.div>
        </motion.section>
      </div>
      <FullBiography
        {...{ isOpen, onOpenChange }}
        data={actor?.biography}
      />
    </section>
  );
}
