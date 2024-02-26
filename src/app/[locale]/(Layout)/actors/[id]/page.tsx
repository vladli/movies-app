import React from "react";

import { getActor } from "@/actions/fetchMovie";
import PageBack from "@/components/PageBack";
import { TLocales } from "@/navigation";

import ActorCard from "./ActorCard";
import KnowForBlock from "./KnowForBlock";
import DotBackground from "@/components/DotBackground";

export async function generateMetadata({ params }: Props) {
  const actor = await getActor(params.id);
  return {
    title: actor?.name || "Not Found",
  };
}

type Props = {
  params: {
    id: string;
    locale: TLocales;
  };
};

export default async function page({ params }: Props) {
  const actor = await getActor(params.id, params.locale);
  return (
    <DotBackground>
      <PageBack />
      <ActorCard actor={actor} />
      <KnowForBlock
        id={params.id}
        locale={params.locale}
      />
    </DotBackground>
  );
}
