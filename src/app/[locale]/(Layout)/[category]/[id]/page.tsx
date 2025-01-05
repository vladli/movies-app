import React from "react";
import { notFound } from "next/navigation";

import { getMovie } from "@/actions/fetchMovie";
import PageBack from "@/components/PageBack";
import { TLocales } from "@/i18n/routing";
import { TCategory } from "@/types/types";

import MovieCard from "./MovieCard";
import MovieCast from "./MovieCast";
import Reviews from "./Reviews";
import SeasonList from "./SeasonList";
import SimilarMovies from "./SimilarMovies";

export async function generateMetadata(props: Props) {
    const params = await props.params;
    const movie = await getMovie(params.category, params.id, params.locale);
    return {
        title: movie?.title || movie?.name || "Not Found",
    };
}

type Props = {
    params: Promise<{
        category: TCategory;
        id: string;
        locale: TLocales;
    }>;
};

export default async function page(props: Props) {
    const params = await props.params;
    if (!["movie", "tv"].includes(params.category)) return notFound();
    const movie = await getMovie(params.category, params.id, params.locale);
    return (
        <section className="flex flex-col">
            <PageBack/>
            <MovieCard
                category={params.category}
                movie={movie}
            />
            {params.category === "tv" && movie && (
                <SeasonList
                    id={params.id}
                    locale={params.locale}
                    tv={movie}
                />
            )}
            <MovieCast
                category={params.category}
                id={params.id}
                locale={params.locale}
            />
            <SimilarMovies
                category={params.category}
                id={params.id}
                locale={params.locale}
            />
            <Reviews
                category={params.category}
                id={params.id}
                locale={params.locale}
            />
        </section>
    );
}
