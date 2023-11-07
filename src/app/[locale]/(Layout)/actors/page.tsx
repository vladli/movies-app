import React from "react";
import type { Metadata } from "next/types";
import { createTranslator } from "next-intl";

import { getActors } from "@/actions/fetchMovie";
import ActorBlock from "@/components/ActorBlock";
import PageContainer from "@/components/PageContainer";

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const messages = (await import(`/dictionaries/${params.locale}.json`))
    .default;
  const t = createTranslator({ locale: params.locale, messages });
  return {
    title: t("Actors.title"),
  };
}

type Props = {
  params: { locale: string };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ params, searchParams }: Props) {
  const { page } = searchParams;
  const actors = await getActors(Number(page), params.locale);
  return (
    <PageContainer
      data={actors}
      title="Actors.title"
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
