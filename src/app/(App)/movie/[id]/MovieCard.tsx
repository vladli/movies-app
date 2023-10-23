import React from "react";
import { Chip, Image } from "@nextui-org/react";

import type { Movie } from "@/actions/getMovie";
import MovieRating from "@/components/MovieRating";
import { TMDB_POSTER_ORIGINAL } from "@/lib/constants";

export default function MovieCard({ data }: { data: Movie }) {
  const movie = data;
  const releaseYear = new Date(movie.release_date).getFullYear();
  return (
    <section>
      <div className="flex flex-col items-center justify-around gap-2 lg:flex-row-reverse lg:items-start">
        <section className="relative min-h-[20rem] max-w-[28rem]">
          <MovieRating
            className="rounded-tl-large"
            score={movie.vote_average}
          />
          <Image
            alt=""
            src={TMDB_POSTER_ORIGINAL + movie.poster_path}
          />
        </section>
        <section className="flex flex-col gap-3">
          <h2 className="w-full text-center text-xl font-medium">
            {movie.title}
          </h2>
          <h3 className="w-full text-center text-medium">
            &quot;{movie.tagline}&quot;
          </h3>
          <div className="flex flex-col gap-2">
            <Chip color="primary">{releaseYear}</Chip>
            <ul className="flex gap-1">
              {movie.genres.map((genre) => (
                <Chip key={genre.id}>{genre.name}</Chip>
              ))}
            </ul>
          </div>
          <div className="max-w-[28rem] rounded-large border border-foreground/60 p-4">
            {movie.overview}d
          </div>
        </section>
      </div>
    </section>
  );
}
