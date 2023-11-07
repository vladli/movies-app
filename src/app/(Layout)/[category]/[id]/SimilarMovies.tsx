"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

import { getSimilarMovie } from "@/actions/fetchMovie";
import MovieCard from "@/components/MovieCard";
import { TCategory, TMovieData } from "@/types/types";

type Props = {
  id: string;
  category: TCategory;
};

export default function SimilarMovies({ id, category }: Props) {
  const { data } = useQuery({
    queryKey: ["similarMovies", id, category],
    queryFn: () => getSimilarMovie(category, id),
  });
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
        {data?.results.map((movie) => (
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
