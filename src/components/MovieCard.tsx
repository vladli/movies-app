"use client";
import React from "react";
import { Card, CardHeader, Chip, Image } from "@nextui-org/react";
import NextImage from "next/image";
import { useTranslations } from "next-intl";

import MovieRating from "@/components/MovieRating";
import { TMDB_POSTER_780 } from "@/lib/constants";
import { Link } from "@/navigation";
import { TCategory, TMovieData } from "@/types/types";

import MovieFavorite from "./MovieFavorite";

type Props = {
  category?: TCategory;
  movie: TMovieData;
  type?: "upcoming" | "top";
};

export default function MovieCard({ category, movie }: Props) {
  const t = useTranslations();

  const releaseYear = new Date(
    (movie.release_date || movie.first_air_date) as string
  ).getFullYear();
  const categoryItem = movie.media_type || category;
  const categoryTranslate =
    categoryItem === "movie" ? t("ROOT.movie") : t("ROOT.tv");
  return (
    <Card
      as={Link}
      className="h-[26rem] w-[14rem] hover:cursor-pointer"
      href={`/${categoryItem}/${movie.id}`}
      isPressable
    >
      <CardHeader className="flex-col !items-start py-4">
        <div className="flex items-center gap-1 text-tiny font-bold uppercase">
          {categoryTranslate}
          <Chip
            color="primary"
            size="sm"
          >
            {releaseYear}
          </Chip>
        </div>

        <h4 className="text-large font-bold">{movie.title || movie.name}</h4>
      </CardHeader>

      <div className="h-full w-full">
        <MovieRating score={movie.vote_average} />
        <MovieFavorite
          className="right-1 mt-1"
          mediaType={category}
          movie={movie}
        />
        {movie.poster_path ? (
          <Image
            alt="Card background"
            as={NextImage}
            className="h-full w-full object-cover"
            height={780}
            radius="none"
            removeWrapper
            src={TMDB_POSTER_780 + movie.poster_path}
            unoptimized
            width={1170}
          />
        ) : null}
      </div>
    </Card>
  );
}
