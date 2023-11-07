"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getMovieList } from "@/actions/fetchMovie";

import MovieBlock from "./MovieBlock";

export default function CategoryBlock() {
  const { data: upcoming } = useQuery({
    queryKey: ["upcoming"],
    queryFn: () => getMovieList("upcoming"),
  });
  const { data: top } = useQuery({
    queryKey: ["top"],
    queryFn: () => getMovieList("top_rated"),
  });
  return (
    <>
      <MovieBlock
        data={upcoming?.results}
        title="Upcoming movies"
        type="upcoming"
      />
      <MovieBlock
        data={top?.results}
        title="Top Rated"
      />
    </>
  );
}
