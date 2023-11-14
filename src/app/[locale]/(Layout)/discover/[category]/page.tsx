import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";

import { getMovieList } from "@/actions/fetchMovie";
import MovieBlock from "@/components/MovieCard";
import PageContainer from "@/components/PageContainer";
import { TListType } from "@/types/types";
import { useTranslations } from "next-intl";
import { TLocales } from "@/navigation";

export const revalidate = 3600;

const title = {
  popular: "Discover.Popular.title",
  top_rated: "Discover.Top Rated.title",
  upcoming: "Discover.Upcoming.title",
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
    locale: TLocales;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

function Translate({ children }: { children: (t: any) => React.ReactNode }) {
  const t = useTranslations();
  return <>{children(t)}</>;
}

export default async function page({ params, searchParams }: Props) {
  if (!["upcoming", "top_rated", "popular"].includes(params.category))
    return notFound();
  const { page } = searchParams;
  const data = await getMovieList(params.category, params.locale, Number(page));

  return (
    <Translate>
      {(t) => (
        <PageContainer
          data={data}
          title={t(title[params.category])}
        >
          {data?.results?.map((movie) => (
            <MovieBlock
              category="movie"
              key={movie.id}
              movie={movie}
            />
          ))}
        </PageContainer>
      )}
    </Translate>
  );
}
