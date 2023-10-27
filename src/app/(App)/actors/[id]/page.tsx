import React from "react";

import { getActor } from "@/actions/fetchMovie";
import { TCastMember } from "@/types/types";

import ActorCard from "./ActorCard";

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
    <div>
      <ActorCard actor={actor} />
    </div>
  );
}
