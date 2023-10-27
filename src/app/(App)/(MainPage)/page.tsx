import React from "react";

import { getGenres, getMovieList } from "@/actions/fetchMovie";

import MovieBlock from "./MovieBlock";
import PopularMovies from "./PopularMovies";

export default async function page() {
  const [movies, upcoming, top, genres] = await Promise.all([
    getMovieList("popular"),
    getMovieList("upcoming"),
    getMovieList("top_rated"),
    getGenres("movie"),
  ]);
  return (
    <>
      <PopularMovies
        data={movies?.results}
        genres={genres?.genres}
      />
      <MovieBlock
        data={upcoming?.results}
        title="Upcoming Movies"
      />
      <MovieBlock
        data={top?.results}
        title="Top Rated"
      />
    </>
  );
}
