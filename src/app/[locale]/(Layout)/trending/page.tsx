import React from "react";
import { Metadata } from "next";
import { createTranslator } from "next-intl";

import { getTrendingMovies } from "@/actions/fetchMovie";
import MovieCard from "@/components/MovieCard";
import PageContainer from "@/components/PageContainer";

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const messages = (await import(`/dictionaries/${params.locale}.json`))
    .default;
  const t = createTranslator({ locale: params.locale, messages });
  return {
    title: t("Trending.title"),
  };
}

type Props = {
  params: { locale: string };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function Home({ params, searchParams }: Props) {
  const { page } = searchParams;
  const data = await getTrendingMovies(Number(page), params.locale);
  return (
    <PageContainer
      data={data}
      title="Trending.title"
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
