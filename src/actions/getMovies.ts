"use server";

type Props = {
  page: number;
  total_pages: number;
  total_results: number;
  results: Movie[];
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export default async function getMovies(): Promise<Props | undefined> {
  const url = `https://api.themoviedb.org/3/trending/movie/week`;
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
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
}
