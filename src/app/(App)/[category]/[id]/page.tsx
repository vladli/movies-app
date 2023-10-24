import React from "react";

import getCast from "@/actions/getCast";
import getMovie from "@/actions/getMovie";

import MovieCard from "./MovieCard";
import MovieCast from "./MovieCast";
import SimilarMovies from "./SimilarMovies";
import getSeries from "@/actions/getSeries";

export default async function page({
  params,
}: {
  params: { category: string; id: string };
}) {
  let movie, series, cast;
  if (params.category === "movie") {
    [movie, cast] = await Promise.all([
      getMovie(params.id),
      getCast("movie", params.id),
    ]);
  } else if (params.category === "tv") {
    [series, cast] = await Promise.all([
      getSeries(params.id),
      getCast("tv", params.id),
    ]);
  }

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
