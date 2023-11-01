"use client";
import { Button, Chip, Image } from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";
import { Autoplay, Keyboard, Navigation, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import MovieFavorite from "@/components/MovieFavorite";
import MovieRating from "@/components/MovieRating";
import { TMDB_BACKDROP_PATH, TMDB_POSTER_780 } from "@/lib/constants";
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
        // autoplay={{ delay: 5000 }}
        className="popularMovies"
        keyboard
        loop
        modules={[Autoplay, Keyboard, Navigation, Virtual]}
        navigation
        slidesPerView={1}
        virtual
      >
        {data?.map((movie, index) => (
          <SwiperSlide
            key={movie.id}
            virtualIndex={index}
          >
            <div className="absolute h-full w-full">
              <NextImage
                alt=""
                className="object-cover"
                fill
                sizes="100vw"
                src={TMDB_BACKDROP_PATH + movie.backdrop_path}
              />
              <div className="absolute h-full w-full bg-gradient-to-b from-background via-background/40 to-background" />
            </div>
            <div className="flex h-full flex-col items-center gap-6 p-4 lg:flex-row-reverse lg:justify-around">
              <section className="relative flex h-[30rem] w-[20rem]">
                <MovieRating
                  className="rounded-tl-large"
                  score={movie?.vote_average}
                />
                <Image
                  alt=""
                  as={NextImage}
                  className="rounded-large"
                  height={1170}
                  src={TMDB_POSTER_780 + movie?.poster_path}
                  width={780}
                />
              </section>
              <section className="relative flex max-w-[32rem] flex-col gap-6">
                <h2 className="text-center text-4xl font-bold lg:text-left">
                  {movie?.title}
                </h2>
                <div className="flex flex-wrap gap-2">
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
                </div>
                <div className="flex flex-col gap-6 text-lg font-medium">
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
