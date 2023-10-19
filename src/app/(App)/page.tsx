import React from "react";
import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";

import getMovies from "@/actions/getMovies";
import { authOptions } from "@/lib/authOptions";

import MovieBlock from "./components/MovieBlock";

export default async function Home() {
  const movies = await getMovies();
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div className="flex flex-wrap justify-evenly gap-4">
      {movies?.results?.map((movie) => (
        <React.Fragment key={movie._id}>
          <MovieBlock movie={movie} />
        </React.Fragment>
      ))}
    </div>
  );
}
