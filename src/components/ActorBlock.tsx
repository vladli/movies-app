"use client";
import React from "react";
import { CiImageOff } from "react-icons/ci";
import { Card, CardHeader, Image } from "@nextui-org/react";

import { Link } from "@/i18n/routing";
import { TMDB_POSTER_780 } from "@/lib/constants";
import { TCastMember, TCategory } from "@/types/types";

type Props = {
    category?: TCategory;
    actor: TCastMember;
};

export default function ActorBlock({category, actor}: Props) {
    return (
        <Card
            as={Link}
            className="h-80 w-48"
            href={`/actors/${actor.id}`}
            isPressable
        >
            <CardHeader className="flex-col !items-start py-4 text-large font-bold">
                {actor.name}
            </CardHeader>
            <div className="flex size-full items-center justify-center">
                {actor.profile_path ? (
                    <Image
                        alt="Card background"
                        className="size-full object-cover"
                        radius="none"
                        removeWrapper
                        src={TMDB_POSTER_780 + actor.profile_path}
                    />
                ) : (
                    <CiImageOff size="4rem"/>
                )}
            </div>
        </Card>
    );
}
