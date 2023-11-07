import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";

import { getMovieList } from "@/actions/fetchMovie";
import MovieBlock from "@/components/MovieCard";
import PageContainer from "@/components/PageContainer";
import { TListType } from "@/types/types";

export const revalidate = 3600;

const title = {
  popular: "Popular",
  top_rated: "Top Rated",
  upcoming: "Upcoming",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: title[params.category],
  };
}

type Props = {
  params: {
    category: TListType;
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ params, searchParams }: Props) {
  if (!["upcoming", "top_rated", "popular"].includes(params.category))
    return notFound();
  const { page } = searchParams;
  const data = await getMovieList(params.category, Number(page));

  return (
    <PageContainer
      data={data}
      title={title[params.category]}
    >
      {data?.results?.map((movie) => (
        <MovieBlock
          category="movie"
          key={movie.id}
          movie={movie}
        />
      ))}
    </PageContainer>
  );
}
