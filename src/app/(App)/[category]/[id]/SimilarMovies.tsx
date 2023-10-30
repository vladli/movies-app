"use client";
import React from "react";
import { motion } from "framer-motion";

import MovieCard from "@/components/MovieCard";
import { TCategory, TMovieData } from "@/types/types";

type Props = {
  data: TMovieData[] | undefined;
  category?: TCategory;
};

export default function SimilarMovies({ data, category }: Props) {
  return (
    <motion.section
      animate={{ opacity: 1, x: 0, transition: { delay: 0.6 } }}
      className="flex flex-col items-center gap-4 bg-gradient-to-b from-background/90 to-background p-4"
      initial={{ opacity: 0, x: -200 }}
    >
      <h2 className="my-4 text-center text-3xl font-bold lg:text-left">
        Similar Titles
      </h2>
      <motion.ul className="flex flex-wrap justify-around gap-4">
        {data?.map((movie) => (
          <MovieCard
            category={category}
            key={movie.id}
            movie={movie}
          />
        ))}
      </motion.ul>
    </motion.section>
  );
}
