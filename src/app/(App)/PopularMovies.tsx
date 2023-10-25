"use client";
import MovieRating from "@/components/MovieRating";
import { TMDB_BACKDROP_PATH, TMDB_POSTER_ORIGINAL } from "@/lib/constants";
import { filterGenreNamesByIDs } from "@/lib/utils";
import { TGenre, TMovieData } from "@/types/types";
import { Button, Chip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {
  data: TMovieData[] | undefined;
  genres: TGenre[] | undefined;
};

export default function PopularMovies({ data, genres }: Props) {
  return (
    <section className="w-full min-h-[calc(100vh-4rem)] flex">
      <Swiper
        slidesPerView={1}
        effect="fade"
        navigation
        modules={[Autoplay, EffectFade, Navigation]}
        autoplay={{ delay: 5000 }}
        className="popularMovies"
      >
        {data?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Image
              className="object-cover"
              src={TMDB_BACKDROP_PATH + movie.backdrop_path}
              alt=""
              fill
              priority
            />
            <div className="absolute z-10 h-full w-full bg-gradient-to-b from-background/95 via-background/50 to-background/95" />

            <div className="w-full h-full flex items-center p-4">
              <div className="z-10 gap-6 flex flex-col-reverse items-center w-full lg:flex-row lg:justify-around">
                <section className="flex flex-col gap-6">
                  <h2 className="text-4xl font-bold text-center lg:text-left">
                    {movie?.title}
                  </h2>
                  <ul className="flex gap-1">
                    {genres &&
                      movie.genre_ids?.map((genre) => (
                        <Chip
                          key={genre}
                          variant="faded"
                          color="default"
                        >
                          {filterGenreNamesByIDs(genre, genres)}
                        </Chip>
                      ))}
                  </ul>
                  <div className="flex gap-6 max-w-[32rem] flex-col text-lg">
                    <span>{movie?.overview}</span>
                    <Button
                      className="font-medium"
                      color="secondary"
                      as={Link}
                      href={`/movie/${movie.id}`}
                    >
                      View Movie
                    </Button>
                  </div>
                </section>
                <section className="relative w-[20rem] h-[28rem]">
                  <MovieRating
                    className="rounded-tl-large"
                    score={movie?.vote_average}
                  />
                  <Image
                    className="rounded-large"
                    fill
                    alt=""
                    src={TMDB_POSTER_ORIGINAL + movie?.poster_path}
                  />
                </section>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
