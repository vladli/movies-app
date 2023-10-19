"use client";
import React from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Image,
  Link,
} from "@nextui-org/react";
import NextImage from "next/image";
import { Movie } from "@/actions/getMovies";

type Props = {
  movie: Movie;
};

export default function MovieBlock({ movie }: Props) {
  return (
    <Card className="w-[18rem] h-[34rem]">
      <CardHeader className="flex-col !items-start py-4">
        <div className="flex items-center gap-1 text-tiny font-bold uppercase">
          {movie.titleType.text}
          <Chip
            size="sm"
            color="primary"
          >
            {movie.releaseYear.year}
          </Chip>
        </div>

        <h4 className="text-large font-bold">{movie.titleText.text}</h4>
      </CardHeader>
      {movie.primaryImage?.url ? (
        <Image
          width={400}
          height={800}
          as={NextImage}
          radius="none"
          removeWrapper
          alt="Card background"
          className="object-cover w-full h-full"
          src={movie.primaryImage.url}
        />
      ) : null}
    </Card>
  );
}
