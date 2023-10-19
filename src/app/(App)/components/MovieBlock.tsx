"use client";
import React from "react";
import { Card, CardHeader, Chip, Image } from "@nextui-org/react";
import NextImage from "next/image";

import { Movie } from "@/actions/getMovies";

type Props = {
  movie: Movie;
};

export default function MovieBlock({ movie }: Props) {
  return (
    <Card className="h-[34rem] w-[18rem]">
      <CardHeader className="flex-col !items-start py-4">
        <div className="flex items-center gap-1 text-tiny font-bold uppercase">
          {movie.titleType.text}
          <Chip
            color="primary"
            size="sm"
          >
            {movie.releaseYear.year}
          </Chip>
        </div>

        <h4 className="text-large font-bold">{movie.titleText.text}</h4>
      </CardHeader>
      {movie.primaryImage?.url ? (
        <Image
          alt="Card background"
          as={NextImage}
          className="h-full w-full object-cover"
          height={800}
          radius="none"
          removeWrapper
          src={movie.primaryImage.url}
          width={400}
        />
      ) : null}
    </Card>
  );
}
