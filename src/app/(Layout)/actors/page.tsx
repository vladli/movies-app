import React from "react";
import type { Metadata } from "next/types";

import { getActors } from "@/actions/fetchMovie";
import ActorBlock from "@/components/ActorBlock";
import PageContainer from "@/components/PageContainer";

export const revalidate = 3600;

export const metadata: Metadata = { title: "Actors" };

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: Props) {
  const { page } = searchParams;
  const actors = await getActors(Number(page));
  return (
    <PageContainer
      data={actors}
      title="Actors"
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
