import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import NextImage from "next/image";

import { TMDB_POSTER_780 } from "@/lib/constants";
import { Link } from "@/navigation";
import { TCastMember } from "@/types/types";

type Props = {
  key: number;
  actor: TCastMember;
};

export default function CastCard({ actor }: Props) {
  return (
    <Card
      as={Link}
      className="h-[20rem] w-[14rem]"
      href={`/actors/${actor.id}`}
      isPressable
      shadow="sm"
    >
      <CardBody className="overflow-visible p-0 ">
        {actor.profile_path && (
          <Image
            alt=""
            as={NextImage}
            className="h-[16rem] w-[14rem] select-none object-cover"
            height={1170}
            radius="lg"
            shadow="sm"
            src={TMDB_POSTER_780 + actor.profile_path}
            unoptimized
            width={780}
          />
        )}
      </CardBody>
      <CardFooter className="justify-between text-small">
        <b>{actor.name}</b>
        <p className="text-default-500">{actor.character}</p>
      </CardFooter>
    </Card>
  );
}
