import React from "react";

import getMovies from "@/actions/getMovies";

import MovieBlock from "./MovieBlock";

export default async function Home() {
  const movies = await getMovies();
  return (
    <div className="flex flex-wrap justify-evenly gap-4">
      {movies?.results?.map((movie) => (
        <React.Fragment key={movie.id}>
          <MovieBlock movie={movie} />
        </React.Fragment>
      ))}
    </div>
  );
}
