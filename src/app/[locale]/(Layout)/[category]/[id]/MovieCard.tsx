"use client";
import { useEffect } from "react";
import { Button, Chip, Image, useDisclosure } from "@nextui-org/react";
import { motion, Variants } from "framer-motion";
import NextImage from "next/image";

import MovieFavorite from "@/components/MovieFavorite";
import MovieRating from "@/components/MovieRating";
import { TMDB_BACKDROP_PATH, TMDB_POSTER_780 } from "@/lib/constants";
import { TCategory, TMovieData } from "@/types/types";

import CardVideo from "./CardVideo";
import { useTranslations } from "next-intl";

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
  category?: TCategory;
  movie: TMovieData | undefined;
};

export default function MovieCard({ category, movie }: Props) {
  const t = useTranslations();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const releaseYear = new Date(
    (movie?.release_date || movie?.first_air_date) as string
  ).getFullYear();
  const backDropImage = movie?.backdrop_path;
  const posterImage = movie?.poster_path;
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

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
        <section className="relative max-w-[28rem] select-none">
          <MovieRating
            className="rounded-tl-large"
            score={movie?.vote_average}
          />

          <NextImage
            alt=""
            className="rounded-large"
            height={1170}
            priority
            quality={100}
            src={TMDB_POSTER_780 + posterImage}
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
            className="flex w-full items-center justify-center gap-2 text-center text-4xl font-bold"
            variants={h2}
          >
            {movie?.title || movie?.name}
            {movie ? (
              <MovieFavorite
                className="relative"
                mediaType={category}
                movie={movie}
              />
            ) : null}
          </motion.h2>
          {movie?.tagline && (
            <motion.h3
              className="w-full text-center text-medium font-medium"
              variants={h3}
            >
              &quot;{movie?.tagline}&quot;
            </motion.h3>
          )}
          <motion.div
            className="flex select-none flex-col items-center gap-2 lg:items-start"
            variants={h3}
          >
            <div className="flex gap-2">
              <Chip color="primary">{releaseYear}</Chip>
              {movie?.genres.map((genre) => (
                <Chip
                  className="capitalize"
                  color="default"
                  key={genre.id}
                  variant="faded"
                >
                  {genre.name}
                </Chip>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="flex max-w-[32rem] flex-col text-lg font-medium"
            variants={h3}
          >
            <p>{movie?.overview || "No information about this title."}</p>
            {movie?.videos.results.length ? (
              <Button
                className="my-10 font-medium"
                color="secondary"
                onPress={onOpen}
              >
                {t("#ROOT.ButtonWatchTrailer")}
              </Button>
            ) : null}
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
