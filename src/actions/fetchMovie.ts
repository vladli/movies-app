"use server";

import {
  TActor,
  TCastMember,
  TCategory,
  TGenre,
  TListType,
  TMovieData,
  TResponse,
  TSearchResult,
  TSortType,
} from "@/types/types";

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
    if (response.status === 200) {
      return response.json();
    }
    console.error("Fetch error.");
    return undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

const getLang = (lang: string) => (lang === "kr" ? "ko" : lang);

export async function getTrendingMovies(
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
  category: TCategory,
  id: string
): Promise<TMovieData | undefined> {
  const params = new URLSearchParams({
    append_to_response: "videos",
  }).toString();
  const url = `https://api.themoviedb.org/3/${category}/${id}?${params}`;
  return fetchData(url);
}

export async function getSimilarMovie(
  category: TCategory,
  id: string
): Promise<TResponse<TMovieData[]> | undefined> {
  const url = `https://api.themoviedb.org/3/${category}/${id}/similar`;
  return fetchData(url);
}

export async function getMovieList(
  type: TListType,
  page: number = 1
): Promise<TResponse<TMovieData[]> | undefined> {
  if (isNaN(Number(page))) {
    page = 1;
  }
  const params = new URLSearchParams({
    page: page.toString(),
  }).toString();
  const url = `https://api.themoviedb.org/3/movie/${type}?${params}`;
  return fetchData(url);
}

export async function getDiscover(
  category: TCategory,
  genre: number | undefined = undefined,
  sort_by: TSortType = "popularity.desc",
  page: number | undefined = 1
): Promise<TResponse<TMovieData[]> | undefined> {
  if (isNaN(Number(page))) {
    page = 1;
  }
  const params = new URLSearchParams({
    page: page.toString(),
    sort_by: sort_by,
    with_genres: genre?.toString() || "undefined",
  }).toString();
  const url = `https://api.themoviedb.org/3/discover/${category}?${params}`;
  return fetchData(url);
}

export async function getCast(
  category: TCategory,
  id: string
): Promise<{ id: number; cast: TCastMember[] } | undefined> {
  const url = `https://api.themoviedb.org/3/${category}/${id}/credits`;
  return fetchData(url);
}

export async function getGenres(
  category: TCategory
): Promise<{ genres: TGenre[] } | undefined> {
  const url = `https://api.themoviedb.org/3/genre/${category}/list`;

  return fetchData(url);
}

export async function getActors(
  page: number = 1
): Promise<TResponse<TCastMember[]> | undefined> {
  if (isNaN(Number(page))) {
    page = 1;
  }
  const params = new URLSearchParams({
    page: page.toString(),
  }).toString();
  const url = `https://api.themoviedb.org/3/person/popular?${params}`;

  return fetchData(url);
}

export async function getActor(personId: string): Promise<TActor | undefined> {
  const url = `https://api.themoviedb.org/3/person/${personId}`;

  return fetchData(url);
}

export async function getCombinedCredits(
  personId: string
): Promise<{ cast: TMovieData[] } | undefined> {
  const url = `https://api.themoviedb.org/3/person/${personId}/combined_credits`;

  return fetchData(url);
}

export async function getSearchResults(
  keyword: string
): Promise<TResponse<TSearchResult[]> | undefined> {
  const params = new URLSearchParams({
    include_adult: "true",
    query: keyword.toString(),
  }).toString();
  const url = `https://api.themoviedb.org/3/search/multi?${params}`;
  return fetchData(url);
}
