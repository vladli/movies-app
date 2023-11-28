"use client";
import React from "react";
import { CiImageOff } from "react-icons/ci";
import { Card, CardHeader, Image } from "@nextui-org/react";

import { TMDB_POSTER_780 } from "@/lib/constants";
import { Link } from "@/navigation";
import { TCastMember, TCategory } from "@/types/types";

type Props = {
  category?: TCategory;
  actor: TCastMember;
};

export default function ActorBlock({ category, actor }: Props) {
  return (
    <Card
      as={Link}
      className="h-[20rem] w-[12rem]"
      href={`/actors/${actor.id}`}
      isPressable
    >
      <CardHeader className="flex-col !items-start py-4 text-large font-bold">
        {actor.name}
      </CardHeader>
      <div className="flex h-full w-full items-center justify-center">
        {actor.profile_path ? (
          <Image
            alt="Card background"
            className="h-full w-full object-cover"
            height={1170}
            radius="none"
            removeWrapper
            src={TMDB_POSTER_780 + actor.profile_path}
            width={780}
          />
        ) : (
          <CiImageOff size="4rem" />
        )}
      </div>
    </Card>
  );
}
