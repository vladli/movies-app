import React from "react";

import getCast from "@/actions/getCast";
import getMovie from "@/actions/getMovie";

import MovieCard from "./MovieCard";
import MovieCast from "./MovieCast";
import SimilarMovies from "./SimilarMovies";
import getSeries from "@/actions/getSeries";

export async function generateMetadata({ params }: Props) {
  const isMovie = params.category === "movie";
  const [movie, series] = await Promise.all([
    isMovie ? getMovie(params.id) : undefined,
    !isMovie ? getSeries(params.id) : undefined,
  ]);
  return {
    title: movie?.title || series?.name || "Not Found",
  };
}

type Props = {
  params: {
    category: string;
    id: string;
  };
};

export default async function page({ params }: Props) {
  if (!["movie", "tv"].includes(params.category)) return null;

  const isMovie = params.category === "movie";
  const [movie, series, cast] = await Promise.all([
    isMovie ? getMovie(params.id) : undefined,
    !isMovie ? getSeries(params.id) : undefined,
    getCast(isMovie ? "movie" : "tv", params.id),
  ]);
  if (!movie && !series) return null;
  return (
    <>
      <MovieCard
        movie={movie}
        series={series}
      />
      <MovieCast data={cast?.cast} />
      <SimilarMovies data={movie} />
    </>
  );
}
