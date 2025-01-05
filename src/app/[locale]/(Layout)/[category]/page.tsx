import React from "react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { getDiscover } from "@/actions/fetchMovie";
import MovieBlock from "@/components/MovieCard";
import PageContainer from "@/components/PageContainer";
import { TLocales } from "@/i18n/routing";

export const revalidate = 3600;

export async function generateMetadata(props: Props) {
    const params = await props.params;

    const {
        locale
    } = params;

    const t = await getTranslations({locale});
    return {
        title: t("TV Series.title"),
    };
}

type Props = {
    params: Promise<{
        category: "tv";
        id: string;
        locale: TLocales;
    }>;
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
};

export default async function page(props: Props) {
    const searchParams = await props.searchParams;
    const params = await props.params;
    if (!["tv"].includes(params.category)) return notFound();
    const {page} = searchParams;
    const t = await getTranslations("TV Series");
    const data = await getDiscover(
        params.category,
        params.locale,

        undefined,
        Number(page)
    );
    return (
        <PageContainer
            data={data}
            title={t("title")}
        >
            {data?.results?.map((movie) => (
                <MovieBlock
                    category="tv"
                    key={movie.id}
                    movie={movie}
                />
            ))}
        </PageContainer>
    );
}
