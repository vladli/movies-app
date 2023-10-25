"use client";
import React from "react";
import { Card, CardHeader, Chip, Image } from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";

import MovieRating from "@/components/MovieRating";
import { TMDB_POSTER_500 } from "@/lib/constants";
import { TMovieData } from "@/types/types";

type Props = {
  movie: TMovieData;
};

export default function MovieBlock({ movie }: Props) {
  const releaseYear = new Date(
    (movie.release_date || movie.first_air_date) as string
  ).getFullYear();
  return (
    <Card
      as={Link}
      className="h-[32rem] w-[19rem] hover:cursor-pointer"
      href={`/${movie.media_type}/${movie.id}`}
    >
      <CardHeader className="flex-col !items-start py-4">
        <div className="flex items-center gap-1 text-tiny font-bold uppercase">
          {movie.media_type}
          <Chip
            color="primary"
            size="sm"
          >
            {releaseYear}
          </Chip>
        </div>

        <h4 className="text-large font-bold">{movie.title || movie.name}</h4>
      </CardHeader>
      {movie.poster_path ? (
        <div className="h-full w-full">
          <MovieRating
            className=""
            score={movie.vote_average}
          />
          <Image
            alt="Card background"
            as={NextImage}
            className="h-full w-full object-cover"
            height={800}
            radius="none"
            removeWrapper
            src={TMDB_POSTER_500 + movie.poster_path}
            width={400}
          />
        </div>
      ) : null}
    </Card>
  );
}
