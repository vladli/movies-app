import React from "react";
import { notFound } from "next/navigation";

import { getMovie } from "@/actions/fetchMovie";
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
    locale: string;
  };
};

export default async function page({ params }: Props) {
  if (!["movie", "tv"].includes(params.category)) return notFound();
  const movie = await getMovie(params.category, params.id);
  return (
    <section className="flex flex-col">
      <PageBack />
      <MovieCard
        category={params.category}
        movie={movie}
      />
      <MovieCast
        category={params.category}
        id={params.id}
      />
      <SimilarMovies
        category={params.category}
        id={params.id}
      />
    </section>
  );
}
