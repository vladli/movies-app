"use client";
import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import { useLocale } from "next-intl";

import MovieFavorite from "@/components/MovieFavorite";
import MovieRating from "@/components/MovieRating";
import { Link } from "@/i18n/routing";
import { TMDB_POSTER_780 } from "@/lib/constants";
import { TMovieData } from "@/types/types";

type Props = {
    movie: TMovieData;
    type?: "upcoming" | "top";
};

export default function MovieCard({movie, type}: Props) {
    let locale = useLocale();
    locale = locale === "kr" ? "ko" : locale;
    const releaseDate = new Date(movie.release_date);
    const year = releaseDate.getFullYear();
    const monthDay = releaseDate.toLocaleString(locale, {
        month: "short",
        day: "numeric",
    });
    const date = type === "upcoming" ? monthDay : `${year}`;
    return (
        <Card
            as={Link}
            className="w-52 lg:w-60"
            href={`/movie/${movie.id}`}
            isPressable
            shadow="sm"
        >
            <CardBody className="overflow-visible p-0">
                <MovieRating
                    className="rounded-tl-large"
                    score={movie?.vote_average}
                />
                <MovieFavorite
                    className="right-1 mt-1"
                    mediaType="movie"
                    movie={movie}
                />
                <Image
                    alt=""
                    className="size-full object-cover"
                    shadow="sm" src={TMDB_POSTER_780 + movie.poster_path}
                    width="100%"
                />
            </CardBody>
            <CardFooter className="justify-between text-small">
                <b>{movie.title}</b>
                <p className="whitespace-nowrap text-default-500">{date}</p>
            </CardFooter>
        </Card>
    );
}
