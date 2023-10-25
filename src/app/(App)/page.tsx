import getPopularMovies from "@/actions/getPopularMovies";
import React from "react";
import PopularMovies from "./PopularMovies";
import UpcomingMovies from "./UpcomingMovies";
import getGenres from "@/actions/getGenres";

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
