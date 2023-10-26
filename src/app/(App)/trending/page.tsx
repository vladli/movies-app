import React from "react";
import { Metadata } from "next";

import { getMovies } from "@/actions/fetchMovie";
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
  const movies = await getMovies(Number(page));
  return (
    <PageContainer
      data={movies}
      title="Trending"
    />
  );
}
