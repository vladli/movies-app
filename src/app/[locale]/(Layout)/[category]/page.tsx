import React from "react";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import { getDiscover } from "@/actions/fetchMovie";
import MovieBlock from "@/components/MovieCard";
import PageContainer from "@/components/PageContainer";
import { TLocales } from "@/navigation";

export const revalidate = 3600;

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale });
  return {
    title: t("TV Series.title"),
  };
}

type Props = {
  params: {
    category: "tv";
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
  if (!["tv"].includes(params.category)) return notFound();
  const { page } = searchParams;

  const data = await getDiscover(
    params.category,
    params.locale,
    undefined,
    undefined,
    Number(page)
  );
  return (
    <Translate>
      {(t) => (
        <PageContainer
          data={data}
          title={t("TV Series.title")}
        >
          {data?.results?.map((movie) => (
            <MovieBlock
              category="tv"
              key={movie.id}
              movie={movie}
            />
          ))}
        </PageContainer>
      )}
    </Translate>
  );
}
