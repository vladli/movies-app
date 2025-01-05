"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { getMovieList } from "@/actions/fetchMovie";
import { TLocales } from "@/i18n/routing";

import MovieBlock from "./MovieBlock";

export default function CategoryBlock({locale}: { locale: TLocales }) {
    const t = useTranslations();
    const {data: upcoming} = useQuery({
        queryKey: ["upcoming", locale],
        queryFn: () => getMovieList("upcoming", locale),
    });
    const {data: top} = useQuery({
        queryKey: ["top", locale],
        queryFn: () => getMovieList("top_rated", locale),
    });
    return (
        <>
            <MovieBlock
                data={upcoming?.results}
                title={t("Discover.Upcoming.title")}
                type="upcoming"
            />
            <MovieBlock
                data={top?.results}
                title={t("Discover.Top Rated.title")}
            />
        </>
    );
}
