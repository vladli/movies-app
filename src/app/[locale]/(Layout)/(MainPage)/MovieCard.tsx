"use client";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import NextImage from "next/image";
import { useLocale } from "next-intl";

import MovieFavorite from "@/components/MovieFavorite";
import MovieRating from "@/components/MovieRating";
import { TMDB_POSTER_780 } from "@/lib/constants";
import { Link } from "@/navigation";
import { TMovieData } from "@/types/types";

type Props = {
  movie: TMovieData;
  type?: "upcoming" | "top";
};

export default function MovieCard({ movie, type }: Props) {
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
      className="h-[21rem] w-[13rem] lg:h-[23rem] lg:w-[15rem]"
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
          as={NextImage}
          className="h-[18rem] w-full object-cover lg:h-[20rem]"
          height={1170}
          radius="lg"
          shadow="sm"
          src={TMDB_POSTER_780 + movie.poster_path}
          unoptimized
          width={780}
        />
      </CardBody>
      <CardFooter className=" justify-between text-small">
        <b>{movie.title}</b>
        <p className="whitespace-nowrap text-default-500">{date}</p>
      </CardFooter>
    </Card>
  );
}
