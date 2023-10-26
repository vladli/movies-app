"use client";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineArrowBack } from "react-icons/md";
import { Button, Chip, Image, useDisclosure } from "@nextui-org/react";
import { motion, Variants } from "framer-motion";
import NextImage from "next/image";

import MovieRating from "@/components/MovieRating";
import PageBack from "@/components/PageBack";
import { TMDB_BACKDROP_PATH, TMDB_POSTER_ORIGINAL } from "@/lib/constants";
import { TMovieData } from "@/types/types";

import CardVideo from "./CardVideo";

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
  movie: TMovieData | undefined;
};

export default function MovieCard({ movie }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const releaseYear = new Date(
    (movie?.release_date || movie?.first_air_date) as string
  ).getFullYear();
  const backDropImage = movie?.backdrop_path;
  const posterImage = movie?.poster_path;
  return (
    <section className="relative">
      <div className="absolute left-0 top-0 z-0 h-full w-full select-none">
        <div className="absolute z-10 h-full w-full bg-gradient-to-b from-background via-background/50 to-background" />
        <NextImage
          alt=""
          className="object-cover"
          fill
          priority
          src={TMDB_BACKDROP_PATH + backDropImage}
        />
      </div>
      <div className="relative top-6 flex flex-col items-center justify-around gap-2 p-6 lg:flex-row-reverse lg:items-start">
        <section className="relative min-h-[20rem] max-w-[28rem] select-none">
          <MovieRating
            className="rounded-tl-large"
            score={movie?.vote_average}
          />
          <Image
            alt=""
            src={TMDB_POSTER_ORIGINAL + posterImage}
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
            {movie?.title || movie?.name}
          </motion.h2>
          <motion.h3
            className="w-full text-center text-medium font-medium"
            variants={h3}
          >
            &quot;{movie?.tagline}&quot;
          </motion.h3>
          <motion.div
            className="flex select-none flex-col items-center gap-2 lg:items-start"
            variants={h3}
          >
            <Chip color="primary">{releaseYear}</Chip>
            <ul className="flex gap-1">
              {movie?.genres.map((genre) => (
                <Chip
                  color="default"
                  key={genre.id}
                  variant="faded"
                >
                  {genre.name}
                </Chip>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className="flex max-w-[32rem] flex-col text-lg"
            variants={h3}
          >
            <span>{movie?.overview}</span>
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
      <CardVideo
        {...{ isOpen, onOpenChange }}
        data={movie?.videos.results}
      />
    </section>
  );
}
