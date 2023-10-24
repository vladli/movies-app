import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

import type { CastMember } from "@/actions/getCast";
import { TMDB_POSTER_500 } from "@/lib/constants";

type Props = {
  key: number;
  actor: CastMember;
};

export default function CastCard({ actor }: Props) {
  return (
    <Card
      className="h-[20rem] w-[14rem]"
      shadow="sm"
    >
      <CardBody className="overflow-visible p-0 ">
        <Image
          alt=""
          className="h-[16rem] w-[14rem] object-cover"
          radius="lg"
          shadow="sm"
          src={TMDB_POSTER_500 + actor.profile_path}
        />
      </CardBody>
      <CardFooter className="justify-between text-small">
        <b>{actor.name}</b>
        <p className="text-default-500">{actor.character}</p>
      </CardFooter>
    </Card>
  );
}
