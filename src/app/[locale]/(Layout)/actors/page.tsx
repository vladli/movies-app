import React from "react";
import { getTranslations } from "next-intl/server";

import { getActors } from "@/actions/fetchMovie";
import ActorBlock from "@/components/ActorBlock";
import PageContainer from "@/components/PageContainer";
import { TLocales } from "@/navigation";

export const revalidate = 3600;

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "Actors" });
  return {
    title: t("title"),
  };
}

type Props = {
  params: {
    locale: TLocales;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: Props) {
  const { page } = searchParams;
  const t = await getTranslations("Actors");
  const actors = await getActors(Number(page));
  return (
    <PageContainer
      data={actors}
      title={t("title")}
    >
      {actors?.results.map((actor) => (
        <ActorBlock
          actor={actor}
          key={actor.id}
        />
      ))}
    </PageContainer>
  );
}
