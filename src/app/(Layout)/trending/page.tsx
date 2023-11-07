import React from "react";
import { Metadata } from "next";

import { getTrendingMovies } from "@/actions/fetchMovie";
import MovieCard from "@/components/MovieCard";
import PageContainer from "@/components/PageContainer";

export const revalidate = 3600;

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
  const data = await getTrendingMovies(Number(page));
  return (
    <PageContainer
      data={data}
      title="Trending"
    >
      {data?.results?.map((movie) => (
        <MovieCard
          category={movie.media_type}
          key={movie.id}
          movie={movie}
        />
      ))}
    </PageContainer>
  );
}