import React from "react";

import getCast from "@/actions/getCast";
import getMovie from "@/actions/getMovie";

import MovieCard from "./MovieCard";
import MovieCast from "./MovieCast";
import SimilarMovies from "./SimilarMovies";

export default async function page({ params }: { params: { id: string } }) {
  const [movie, cast] = await Promise.all([
    getMovie(params.id),
    getCast(params.id),
  ]);
  if (!movie) return null;

  return (
    <>
      <MovieCard data={movie} />
      <MovieCast data={cast?.cast} />
      <SimilarMovies data={movie} />
    </>
  );
}
