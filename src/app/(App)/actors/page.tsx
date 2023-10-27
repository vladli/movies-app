import React from "react";

import { getActors } from "@/actions/fetchMovie";
import ActorBlock from "@/components/ActorBlock";
import PageContainer from "@/components/PageContainer";

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
      title="Popular Actors"
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
