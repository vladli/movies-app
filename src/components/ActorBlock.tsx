"use client";
import React from "react";
import { Card, CardHeader, Image } from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";

import { TMDB_POSTER_780 } from "@/lib/constants";
import { TCastMember, TCategory } from "@/types/types";

type Props = {
  category?: TCategory;
  actor: TCastMember;
};

export default function ActorBlock({ category, actor }: Props) {
  return (
    <Card
      as={Link}
      className="h-[20rem] w-[12rem] hover:cursor-pointer"
      href={`/actors/${actor.id}`}
      isPressable
    >
      <CardHeader className="flex-col !items-start py-4">
        <h4 className="text-large font-bold">{actor.name}</h4>
      </CardHeader>
      {actor.profile_path ? (
        <div className="h-full w-full">
          <Image
            alt="Card background"
            as={NextImage}
            className="h-full w-full object-cover"
            height={1170}
            radius="none"
            removeWrapper
            src={TMDB_POSTER_780 + actor.profile_path}
            unoptimized
            width={780}
          />
        </div>
      ) : null}
    </Card>
  );
}
