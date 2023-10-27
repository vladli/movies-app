"use client";
import React from "react";
import { Card, CardHeader, Chip, Image } from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";

import MovieRating from "@/components/MovieRating";
import { TMDB_POSTER_500 } from "@/lib/constants";
import { TCastMember, TCategory, TMovieData } from "@/types/types";

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
            height={800}
            radius="none"
            removeWrapper
            src={TMDB_POSTER_500 + actor.profile_path}
            width={400}
          />
        </div>
      ) : null}
    </Card>
  );
}
