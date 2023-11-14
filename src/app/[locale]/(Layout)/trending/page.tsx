import React from "react";
import { Metadata } from "next";

import { getTrendingMovies } from "@/actions/fetchMovie";
import MovieCard from "@/components/MovieCard";
import PageContainer from "@/components/PageContainer";
import { useTranslations } from "next-intl";
import { TLocales } from "@/navigation";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Trending",
};

type Props = {
  params: { locale: TLocales };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

function Translation({ children }: { children: (t: any) => React.ReactNode }) {
  const t = useTranslations();
  return <>{children(t)}</>;
}

export default async function Home({ params, searchParams }: Props) {
  const { page } = searchParams;
  const data = await getTrendingMovies(params.locale, Number(page));
  return (
    <Translation>
      {(t) => (
        <PageContainer
          data={data}
          title={t("Trending.title")}
        >
          {data?.results?.map((movie) => (
            <MovieCard
              category={movie.media_type}
              key={movie.id}
              movie={movie}
            />
          ))}
        </PageContainer>
      )}
    </Translation>
  );
}
