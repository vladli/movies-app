import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDiscover } from "@/actions/fetchMovie";
import MovieBlock from "@/components/MovieCard";
import PageContainer from "@/components/PageContainer";

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = params.category === "tv" ? "TV" : "Movies";
  return {
    title: title,
  };
}

type Props = {
  params: {
    category: "tv";
    id: string;
    locale: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ params, searchParams }: Props) {
  if (!["tv"].includes(params.category)) return notFound();
  const { page } = searchParams;

  const data = await getDiscover(
    params.category,
    undefined,
    undefined,
    Number(page)
  );
  return (
    <PageContainer
      data={data}
      title="TV Series"
    >
      {data?.results?.map((movie) => (
        <MovieBlock
          category="tv"
          key={movie.id}
          movie={movie}
        />
      ))}
    </PageContainer>
  );
}
