import React from "react";

import { getActor } from "@/actions/fetchMovie";
import PageBack from "@/components/PageBack";

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
  const actor = await getActor(params.id);
  return (
    <>
      <PageBack />
      <ActorCard actor={actor} />
      <KnowForBlock id={params.id} />
    </>
  );
}
