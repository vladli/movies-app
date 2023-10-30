import React from "react";

import { TMovieData } from "@/types/types";

import MovieCard from "./MovieCard";

type Props = {
  title: string;
  data: TMovieData[] | undefined;
  type?: "upcoming" | "top";
};

export default function MovieBlock({ title, data, type }: Props) {
  return (
    <section className="flex flex-col gap-4 p-2">
      <h2 className="my-10 w-full text-center text-4xl font-bold">{title}</h2>
      <div className="grid grid-cols-2 justify-items-center gap-4 xl:grid-cols-5">
        {data?.slice(0, 10)?.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            type={type}
          />
        ))}
      </div>
    </section>
  );
}
