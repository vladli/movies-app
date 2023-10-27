import React from "react";
import { Metadata } from "next";

import { getMovies } from "@/actions/fetchMovie";
import MovieBlock from "@/components/MovieBlock";
import PageContainer from "@/components/PageContainer";

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
  const data = await getMovies(Number(page));
  return (
    <PageContainer
      data={data}
      title="Trending"
    >
      {data?.results?.map((movie) => (
        <MovieBlock
          category={movie.media_type}
          key={movie.id}
          movie={movie}
        />
      ))}
    </PageContainer>
  );
}
