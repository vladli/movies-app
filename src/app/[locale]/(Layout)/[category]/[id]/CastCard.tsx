import React from "react";
import {CiImageOff} from "react-icons/ci";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

import {Link} from "@/i18n/routing";
import {TMDB_POSTER_780} from "@/lib/constants";
import {TCastMember} from "@/types/types";

type Props = {
    key: number;
    actor: TCastMember;
};

export default function CastCard({actor}: Props) {
    return (
        <Card
            as={Link}
            className="h-80 w-56"
            href={`/actors/${actor.id}`}
            isPressable
            shadow="sm"
        >
            <CardBody className="overflow-visible p-0 ">
                {actor.profile_path ? (
                    <Image
                        alt=""
                        className="h-64 w-56 select-none object-cover"
                        radius="lg"
                        shadow="sm"
                        src={TMDB_POSTER_780 + actor.profile_path}
                    />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <CiImageOff size="4rem"/>
                    </div>
                )}
            </CardBody>
            <CardFooter className="justify-between text-small">
                <b>{actor.name}</b>
                <p className="text-default-500">{actor.character}</p>
            </CardFooter>
        </Card>
    );
}
