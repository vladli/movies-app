import React from "react";
import type { Metadata } from "next/types";
import { getTranslations } from "next-intl/server";

import { getActors } from "@/actions/fetchMovie";
import ActorBlock from "@/components/ActorBlock";
import PageContainer from "@/components/PageContainer";

export const revalidate = 3600;

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
