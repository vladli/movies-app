"use client";
import { CiImageOff } from "react-icons/ci";
import { Card, CardHeader, Chip, Image } from "@nextui-org/react";

import MovieRating from "@/components/MovieRating";
import { Link } from "@/i18n/routing";
import { TMDB_POSTER_780 } from "@/lib/constants";
import { TCategory, TMovieData } from "@/types/types";

import MovieFavorite from "./MovieFavorite";

type Props = {
    category?: TCategory;
    movie: TMovieData;
    type?: "upcoming" | "top";
};

export default function MovieCard({category, movie}: Props) {
    const releaseYear = new Date(
        (movie.release_date || movie.first_air_date) as string
    ).getFullYear();
    const categoryItem = movie.media_type || category;

    return (
        <Card
            as={Link}
            className="h-[27rem] w-60 hover:cursor-pointer"
            href={`/${categoryItem}/${movie.id}`}
            isPressable
        >
            <CardHeader className="flex-col !items-start py-4">
                <div className="flex items-center gap-1 text-tiny font-bold uppercase">
                    {categoryItem}
                    <Chip
                        color="primary"
                        size="sm"
                    >
                        {releaseYear}
                    </Chip>
                </div>

                <h4 className="line-clamp-2 text-large font-bold">
                    {movie.title || movie.name}
                </h4>
            </CardHeader>

            <div className="size-full">
                <MovieRating score={movie.vote_average}/>
                <MovieFavorite
                    className="right-1 mt-1"
                    mediaType={category}
                    movie={movie}
                />
                {movie.poster_path ? (
                    <Image
                        alt="Card background"
                        className="size-full object-cover"
                        radius="none"
                        removeWrapper
                        src={TMDB_POSTER_780 + movie.poster_path}
                    />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <CiImageOff size="4rem"/>
                    </div>
                )}
            </div>
        </Card>
    );
}
