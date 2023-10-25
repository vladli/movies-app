"use client";
import React from "react";
import { Button, Chip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import MovieRating from "@/components/MovieRating";
import { TMDB_BACKDROP_PATH, TMDB_POSTER_ORIGINAL } from "@/lib/constants";
import { filterGenreNamesByIDs } from "@/lib/utils";
import { TGenre, TMovieData } from "@/types/types";

type Props = {
  data: TMovieData[] | undefined;
  genres: TGenre[] | undefined;
};

export default function PopularMovies({ data, genres }: Props) {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] w-full">
      <Swiper
        autoplay={{ delay: 5000 }}
        className="popularMovies"
        effect="fade"
        modules={[Autoplay, EffectFade, Navigation]}
        navigation
        slidesPerView={1}
      >
        {data?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="absolute h-full w-full">
              <Image
                alt=""
                className="object-cover "
                fill
                priority
                src={TMDB_BACKDROP_PATH + movie.backdrop_path}
              />
              <div className="absolute h-full w-full bg-gradient-to-b from-background/95 via-background/50 to-background/95" />
            </div>
            <div className="flex h-full flex-col items-center gap-6 p-4 lg:flex-row-reverse lg:justify-around">
              <section className="relative flex h-[28rem] w-[20rem]">
                <MovieRating
                  className="rounded-tl-large"
                  score={movie?.vote_average}
                />
                <Image
                  alt=""
                  className="rounded-large"
                  height={600}
                  src={TMDB_POSTER_ORIGINAL + movie?.poster_path}
                  width={400}
                />
              </section>
              <section className="relative flex flex-col gap-6">
                <h2 className="text-center text-4xl font-bold lg:text-left">
                  {movie?.title}
                </h2>
                <ul className="flex gap-1">
                  {genres &&
                    movie.genre_ids?.map((genre) => (
                      <Chip
                        color="default"
                        key={genre}
                        variant="faded"
                      >
                        {filterGenreNamesByIDs(genre, genres)}
                      </Chip>
                    ))}
                </ul>
                <div className="flex max-w-[32rem] flex-col gap-6 text-lg">
                  <span>{movie?.overview}</span>
                  <Button
                    as={Link}
                    className="font-medium"
                    color="secondary"
                    href={`/movie/${movie.id}`}
                  >
                    View Movie
                  </Button>
                </div>
              </section>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
