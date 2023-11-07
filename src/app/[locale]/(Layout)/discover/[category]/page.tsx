import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import { getTranslations } from "next-intl/server";

import { getMovieList } from "@/actions/fetchMovie";
import MovieBlock from "@/components/MovieCard";
import PageContainer from "@/components/PageContainer";
import { TListType } from "@/types/types";

export const revalidate = 3600;

type Props = {
  params: {
    category: TListType;
    id: string;
    locale: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ params, searchParams }: Props) {
  if (!["upcoming", "top_rated", "popular"].includes(params.category))
    return notFound();
  const { page } = searchParams;
  const data = await getMovieList(params.category, params.locale, Number(page));
  const title = {
    top_rated: "Discover.Top Rated.title",
    popular: "Discover.Popular.title",
    upcoming: "Discover.Upcoming.title",
  };
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
