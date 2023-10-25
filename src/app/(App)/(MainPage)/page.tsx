import React from "react";

import getGenres from "@/actions/getGenres";
import getPopularMovies from "@/actions/getPopularMovies";

import PopularMovies from "./PopularMovies";
import UpcomingMovies from "./UpcomingMovies";

export default async function page() {
  const [movies, genres] = await Promise.all([getPopularMovies(), getGenres()]);
  return (
    <>
      <PopularMovies
        data={movies?.results}
        genres={genres?.genres}
      />
      <UpcomingMovies />
    </>
  );
}
