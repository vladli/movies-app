"use server";

import { TMovieData, TResponse } from "@/types/types";

type Props = {
  page: number;
  total_pages: number;
  total_results: number;
  results: Movie[];
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export default async function getPopularMovies(): Promise<
  TResponse<TMovieData[]> | undefined
> {
  const params = new URLSearchParams({
    page: "1",
  }).toString();
  const url = `https://api.themoviedb.org/3/movie/popular?${params}`;
  const options = {
    method: "GET",
    headers: {
      Authorization: process.env.TMBD_API as string,
    },
  };
  try {
    const response = await fetch(url, {
      ...options,
      // cache: "no-store",
      next: { revalidate: 60000 },
    });
    if (response.status === 200) return response.json();
    return undefined;
  } catch (error) {
    console.error(error);
  }
}
