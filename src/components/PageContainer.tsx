import React from "react";

import { TCategory, TMovieData, TResponse } from "@/types/types";

import MovieBlock from "./MovieBlock";
import Pagination from "./Pagination";

type Props = {
  title: string;
  category?: TCategory;
  data: TResponse<TMovieData[]> | undefined;
};

export default function PageContainer({
  title,
  category = "movie",
  data,
}: Props) {
  const totalResults = data?.total_results
    ? new Intl.NumberFormat().format(data.total_results)
    : 0;

  return (
    <section className="flex flex-col gap-10 p-4">
      <div className="flex flex-col items-center pl-2 lg:items-start">
        <h2 className="text-center text-4xl font-bold capitalize lg:text-start">
          {title}
        </h2>
        <h3 className="font-medium text-foreground-500">
          Total: {totalResults}
        </h3>
      </div>
      <div className="flex flex-wrap justify-evenly gap-4">
        {data?.results?.map((movie) => (
          <MovieBlock
            category={category}
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
      <Pagination
        currentPage={data?.page}
        totalPages={500}
      />
    </section>
  );
}
