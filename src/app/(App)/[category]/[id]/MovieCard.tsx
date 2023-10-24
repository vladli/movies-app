"use client";
import React from "react";
import { Button, Chip, Image, useDisclosure } from "@nextui-org/react";
import { motion, Variants } from "framer-motion";
import NextImage from "next/image";

import type { Movie } from "@/actions/getMovie";
import MovieRating from "@/components/MovieRating";
import { TMDB_BACKDROP_PATH, TMDB_POSTER_ORIGINAL } from "@/lib/constants";

import CardVideo from "./CardVideo";
import type { TVShow } from "@/actions/getSeries";

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

export default function MovieCard({
  movie,
  series,
}: {
  movie: Movie | undefined;
  series: TVShow | undefined;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const releaseYear = new Date(
    movie?.release_date || (series?.first_air_date as string)
  ).getFullYear();
  const backDropImage = movie?.backdrop_path || series?.backdrop_path;
  const posterImage = movie?.poster_path || series?.poster_path;
  return (
    <section className="relative">
      <div className="absolute left-0 top-0 z-0 h-full w-full">
        <div className="absolute z-10 h-full w-full bg-gradient-to-b from-content1/95 via-content1/50 to-black/95" />
        <NextImage
          alt=""
          className="object-cover"
          fill
          priority
          src={TMDB_BACKDROP_PATH + backDropImage}
        />
      </div>
      <div className="flex flex-col items-center justify-around gap-2 p-4 lg:flex-row-reverse lg:items-start">
        <section className="relative min-h-[20rem] max-w-[28rem]">
          <MovieRating
            className="rounded-tl-large"
            score={movie?.vote_average || series?.vote_average}
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
            className="w-full text-center text-4xl font-medium"
            variants={h2}
          >
            {movie?.title || series?.name}
          </motion.h2>
          <motion.h3
            className="w-full text-center text-medium"
            variants={h3}
          >
            &quot;{movie?.tagline || series?.tagline}&quot;
          </motion.h3>
          <motion.div
            className="flex flex-col items-center gap-2 lg:items-start"
            variants={h3}
          >
            <Chip color="primary">{releaseYear}</Chip>
            <ul className="flex gap-1">
              {movie?.genres.map((genre) => (
                <Chip key={genre.id}>{genre.name}</Chip>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className="flex max-w-[32rem] flex-col text-lg"
            variants={h3}
          >
            <span>{movie?.overview || series?.overview}</span>
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
        data={movie?.videos.results || series?.videos?.results}
      />
    </section>
  );
}
