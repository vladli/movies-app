import React from "react";
import { getTranslations } from "next-intl/server";

import { getActors } from "@/actions/fetchMovie";
import ActorBlock from "@/components/ActorBlock";
import PageContainer from "@/components/PageContainer";
import { TLocales } from "@/i18n/routing";

export const revalidate = 3600;

export async function generateMetadata(props: Props) {
    const params = await props.params;

    const {
        locale
    } = params;

    const t = await getTranslations({locale, namespace: "Actors"});
    return {
        title: t("title"),
    };
}

type Props = {
    params: Promise<{
        locale: TLocales;
    }>;
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
};

export default async function page(props: Props) {
    const searchParams = await props.searchParams;
    const {page} = searchParams;
    const t = await getTranslations("Actors");
    const actors = await getActors(Number(page));
    return (
        <PageContainer
            data={actors}
            title={t("title")}
        >
            {actors?.results.map((actor) => (
                <ActorBlock
                    actor={actor}
                    key={actor.id}
                />
            ))}
        </PageContainer>
    );
}
