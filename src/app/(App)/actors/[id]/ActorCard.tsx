"use client";
import { Button, Chip, Image, useDisclosure } from "@nextui-org/react";
import { motion, Variants } from "framer-motion";
import NextImage from "next/image";

import MovieRating from "@/components/MovieRating";
import { TMDB_BACKDROP_PATH, TMDB_POSTER_ORIGINAL } from "@/lib/constants";
import { TActor, TCastMember, TMovieData } from "@/types/types";

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <section className="relative">
      <div className="absolute left-0 top-0 z-0 h-full w-full select-none">
        <div className="absolute z-10 h-full w-full bg-gradient-to-b from-background via-background/50 to-background" />
        <NextImage
          alt=""
          className="object-cover"
          fill
          priority
          src={TMDB_BACKDROP_PATH}
        />
      </div>
      <div className="relative top-6 flex flex-col items-center justify-around gap-2 p-6 lg:flex-row-reverse lg:items-start">
        <section className="relative min-h-[20rem] max-w-[28rem] select-none">
          <Image
            alt=""
            src={TMDB_POSTER_ORIGINAL + actor?.profile_path}
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

          <motion.div
            className="flex max-w-[32rem] flex-col text-lg"
            variants={h3}
          >
            <span>{actor?.biography}</span>
            <Button
              className="my-10 font-medium"
              color="secondary"
              onPress={onOpen}
            >
              Watch Trailer
            </Button>
          </motion.div>
        </motion.section>
      </div>
    </section>
  );
}
