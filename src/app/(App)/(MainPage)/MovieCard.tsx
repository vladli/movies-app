"use client";
import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";

import MovieRating from "@/components/MovieRating";
import { TMDB_POSTER_500 } from "@/lib/constants";
import { TMovieData } from "@/types/types";

type Props = {
  movie: TMovieData;
  type?: "upcoming" | "top";
};

export default function MovieCard({ movie, type }: Props) {
  const releaseDate = new Date(movie.release_date);
  const year = releaseDate.getFullYear();
  const month = releaseDate.toLocaleString("en-US", { month: "short" });
  const day = releaseDate.getDate();
  const date = type === "upcoming" ? `${month}. ${day}` : `${year}`;
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
        <Image
          alt=""
          as={NextImage}
          className="h-[18rem] w-full object-cover lg:h-[20rem]"
          height={1170}
          radius="lg"
          shadow="sm"
          src={TMDB_POSTER_500 + movie.poster_path}
          width={500}
        />
      </CardBody>
      <CardFooter className=" justify-between text-small">
        <b>{movie.title}</b>
        <p className="whitespace-nowrap text-default-500">{date}</p>
      </CardFooter>
    </Card>
  );
}
