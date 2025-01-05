import React from "react";

import { getActor } from "@/actions/fetchMovie";
import DotBackground from "@/components/DotBackground";
import PageBack from "@/components/PageBack";
import { TLocales } from "@/i18n/routing";

import ActorCard from "./ActorCard";
import KnowForBlock from "./KnowForBlock";

export async function generateMetadata(props: Props) {
    const params = await props.params;
    const actor = await getActor(params.id);
    return {
        title: actor?.name || "Not Found",
    };
}

type Props = {
    params: Promise<{
        id: string;
        locale: TLocales;
    }>;
};

export default async function page(props: Props) {
    const params = await props.params;
    const actor = await getActor(params.id, params.locale);
    return (
        <DotBackground>
            <PageBack/>
            <ActorCard actor={actor}/>
            <KnowForBlock
                id={params.id}
                locale={params.locale}
            />
        </DotBackground>
    );
}
