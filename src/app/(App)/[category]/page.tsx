import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDiscover, TCategory } from "@/actions/fetchMovie";
import MovieBlock from "@/components/MovieBlock";
import Pagination from "@/components/Pagination";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = params.category === "tv" ? "TV" : "Movies";
  return {
    title: title,
  };
}

type Props = {
  params: {
    category: TCategory;
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ params, searchParams }: Props) {
  if (!["movie", "tv"].includes(params.category)) return notFound();
  const { page } = searchParams;

  const data = await getDiscover(
    params.category,
    undefined,
    undefined,
    Number(page)
  );
  return (
    <section className="flex flex-col items-center gap-10 p-4">
      <div className="flex flex-wrap justify-evenly gap-4">
        {data?.results?.map((movie) => (
          <MovieBlock
            category="tv"
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
