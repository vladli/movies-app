"use server";

import { TCastMember, TGenre, TMovieData, TResponse } from "@/types/types";

export async function fetchData(
  url: string,
  opt?: RequestInit
): Promise<any | undefined> {
  const options = {
    method: "GET",
    headers: {
      Authorization: process.env.TMBD_API as string,
    },
  };
  try {
    const response = await fetch(url, { ...options, ...opt });
    if (response.status === 200) return response.json();
    return undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function getMovies(
  page: number | undefined = 1
): Promise<TResponse<TMovieData[]> | undefined> {
  if (isNaN(Number(page))) {
    page = 1;
  }
  const params = new URLSearchParams({
    page: page.toString(),
  }).toString();
  const url = `https://api.themoviedb.org/3/trending/all/week?${params}`;
  return fetchData(url);
}

export async function getMovie(
  type = "movie",
  id: string
): Promise<TMovieData | undefined> {
  const params = new URLSearchParams({
    append_to_response: "videos",
  }).toString();
  const url = `https://api.themoviedb.org/3/${type}/${id}?${params}`;
  return fetchData(url);
}

type ListType = "upcoming" | "top_rated" | "popular";
export async function getMovieList(
  type: ListType
): Promise<TResponse<TMovieData[]> | undefined> {
  const params = new URLSearchParams({
    page: "1",
  }).toString();
  const url = `https://api.themoviedb.org/3/movie/${type}?${params}`;
  return fetchData(url);
}

export async function getCast(
  category: string,
  id: string
): Promise<{ id: number; cast: TCastMember[] } | undefined> {
  const url = `https://api.themoviedb.org/3/${category}/${id}/credits`;
  return fetchData(url);
}

export default async function getGenres(
  category = "movie"
): Promise<{ genres: TGenre[] } | undefined> {
  const url = `https://api.themoviedb.org/3/genre/${category}/list`;

  return fetchData(url);
}
