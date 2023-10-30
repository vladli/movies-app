import React from "react";

import { getActor, getCombinedCredits } from "@/actions/fetchMovie";

import ActorCard from "./ActorCard";
import KnowForBlock from "./KnowForBlock";

export async function generateMetadata({ params }: Props) {
  const actor = await getActor(params.id);
  return {
    title: actor?.name || "Not Found",
  };
}

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params }: Props) {
  const [actor, knownFor] = await Promise.all([
    getActor(params.id),
    getCombinedCredits(params.id),
  ]);
  return (
    <>
      <ActorCard actor={actor} />
      <KnowForBlock data={knownFor?.cast} />
    </>
  );
}
