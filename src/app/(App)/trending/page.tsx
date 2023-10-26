import React from "react";
import { Metadata } from "next";

import { getMovies } from "@/actions/fetchMovie";

import MovieBlock from "../../../components/MovieBlock";
import Pagination from "../../../components/Pagination";

export const metadata: Metadata = {
  title: "Trending",
};

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function Home({ searchParams }: Props) {
  const { page } = searchParams;
  const movies = await getMovies(Number(page));
  return (
    <section className="flex flex-col items-center gap-10 p-4">
      <div className="flex flex-wrap justify-evenly gap-4">
        {movies?.results?.map((movie) => (
          <React.Fragment key={movie.id}>
            <MovieBlock movie={movie} />
          </React.Fragment>
        ))}
      </div>
      <Pagination
        currentPage={movies?.page}
        totalPages={500}
      />
    </section>
  );
}
