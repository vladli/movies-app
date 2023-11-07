import React from "react";
import { notFound } from "next/navigation";

import { getCast, getMovie, getSimilarMovie } from "@/actions/fetchMovie";
import PageBack from "@/components/PageBack";
import { TCategory } from "@/types/types";

import MovieCard from "./MovieCard";
import MovieCast from "./MovieCast";
import SimilarMovies from "./SimilarMovies";

type Props = {
  params: {
    category: TCategory;
    id: string;
    locale: string;
  };
};

export default async function page({ params }: Props) {
  if (!["movie", "tv"].includes(params.category)) return notFound();

  const [movie, cast, similar] = await Promise.all([
    getMovie(params.category, params.id, params.locale),
    getCast(params.category, params.id, params.locale),
    getSimilarMovie(params.category, params.id, params.locale),
  ]);
  if (!movie) return null;
  return (
    <section className="flex flex-col">
      <PageBack />
      <MovieCard
        category={params.category}
        movie={movie}
      />
      <MovieCast data={cast?.cast} />
      <SimilarMovies
        category={params.category}
        data={similar?.results}
      />
    </section>
  );
}
