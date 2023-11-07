import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createTranslator } from "next-intl";
import { getTranslations } from "next-intl/server";

import { getDiscover } from "@/actions/fetchMovie";
import MovieBlock from "@/components/MovieCard";
import PageContainer from "@/components/PageContainer";

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const messages = (await import(`/dictionaries/${params.locale}.json`))
    .default;
  const t = createTranslator({ locale: params.locale, messages });
  const title = params.category === "tv" ? t("ROOT.tv") : t("ROOT.movie");
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
  const title = {
    tv: "TV Series.title",
  };
  const data = await getDiscover(
    params.category,
    params.locale,
    undefined,
    undefined,
    Number(page)
  );
  return (
    <PageContainer
      data={data}
      title={title[params.category]}
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
