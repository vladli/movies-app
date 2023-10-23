"use client";
import React from "react";
import { Card, CardHeader, Chip, Image } from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";

import { Movie } from "@/actions/getMovies";
import MovieRating from "@/components/MovieRating";
import { TMDB_POSTER_500 } from "@/lib/constants";

type Props = {
  movie: Movie;
};

export default function MovieBlock({ movie }: Props) {
  const releaseYear = new Date(movie.release_date).getFullYear();
  return (
    <Card
      as={Link}
      className="h-[34rem] w-[18rem] hover:cursor-pointer"
      href={`/movie/${movie.id}`}
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

        <h4 className="text-large font-bold">{movie.title}</h4>
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
