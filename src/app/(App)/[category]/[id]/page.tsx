import React from "react";

import { getCast, getMovie } from "@/actions/fetchMovie";
import PageBack from "@/components/PageBack";
import { TCategory } from "@/types/types";

import MovieCard from "./MovieCard";
import MovieCast from "./MovieCast";
import SimilarMovies from "./SimilarMovies";

export async function generateMetadata({ params }: Props) {
  const movie = await getMovie(params.category, params.id);
  return {
    title: movie?.title || movie?.name || "Not Found",
  };
}

type Props = {
  params: {
    category: TCategory;
    id: string;
  };
};

export default async function page({ params }: Props) {
  if (!["movie", "tv"].includes(params.category)) return null;

  const [movie, cast] = await Promise.all([
    getMovie(params.category, params.id),
    getCast(params.category, params.id),
  ]);
  if (!movie) return null;
  return (
    <section className="flex flex-col">
      <PageBack />
      <MovieCard movie={movie} />
      <MovieCast data={cast?.cast} />
      <SimilarMovies data={movie} />
    </section>
  );
}
