import React from "react";

import { getActor, getCombinedCredits } from "@/actions/fetchMovie";
import PageBack from "@/components/PageBack";

import ActorCard from "./ActorCard";
import KnowForBlock from "./KnowForBlock";

type Props = {
  params: {
    id: string;
    locale: string;
  };
};

export default async function page({ params }: Props) {
  const [actor, knownFor] = await Promise.all([
    getActor(params.id, params.locale),
    getCombinedCredits(params.id, params.locale),
  ]);
  return (
    <>
      <PageBack />
      <ActorCard actor={actor} />
      <KnowForBlock data={knownFor?.cast} />
    </>
  );
}
