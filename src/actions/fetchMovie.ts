"use server";

import type { TLocales } from "@/navigation";
import {
  TActor,
  TCastMember,
  TCategory,
  TGenre,
  TListType,
  TMovieData,
  TResponse,
  TResponseSeasons,
  TReview,
  TSearchResult,
  TSeries,
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

const getLang = (lang: TLocales) => (lang === "kr" ? "ko" : lang);

export async function getTrendingMovies(
  language: TLocales = "en",
  page: number | undefined = 1
): Promise<TResponse<TMovieData[]> | undefined> {
  if (isNaN(Number(page))) {
    page = 1;
  }
  const params = new URLSearchParams({
    page: page.toString(),
    language: getLang(language),
  }).toString();
  const url = `https://api.themoviedb.org/3/trending/all/week?${params}`;
  return fetchData(url);
}

export async function getMovie(
  category: TCategory,
  id: string,
  language: TLocales = "en"
): Promise<TMovieData | undefined> {
  const params = new URLSearchParams({
    append_to_response: "videos",
    language: getLang(language),
  }).toString();
  const url = `https://api.themoviedb.org/3/${category}/${id}?${params}`;
  return fetchData(url);
}

export async function getMovieList(
  type: TListType,
  language: TLocales = "en",
  page: number = 1
): Promise<TResponse<TMovieData[]> | undefined> {
  if (isNaN(Number(page))) {
    page = 1;
  }
  const params = new URLSearchParams({
    page: page.toString(),
    language: getLang(language),
  }).toString();
  const url = `https://api.themoviedb.org/3/movie/${type}?${params}`;
  return fetchData(url);
}

export async function getDiscover(
  category: TCategory,
  language: TLocales = "en",
  sort_by: TSortType = "popularity.desc",
  page: number | undefined = 1
): Promise<TResponse<TMovieData[]> | undefined> {
  if (isNaN(Number(page))) {
    page = 1;
  }
  const params = new URLSearchParams({
    language: getLang(language),
    page: page.toString(),
    sort_by: sort_by,
  }).toString();
  const url = `https://api.themoviedb.org/3/discover/${category}?${params}`;
  return fetchData(url);
}

export async function getCast(
  category: TCategory,
  id: string,
  language: TLocales = "en"
): Promise<{ id: number; cast: TCastMember[] } | undefined> {
  const params = new URLSearchParams({
    language: getLang(language),
  }).toString();
  const url = `https://api.themoviedb.org/3/${category}/${id}/credits?${params}`;
  return fetchData(url);
}

export async function getGenres(
  category: TCategory,
  language: TLocales = "en"
): Promise<{ genres: TGenre[] } | undefined> {
  const params = new URLSearchParams({
    language: getLang(language),
  }).toString();
  const url = `https://api.themoviedb.org/3/genre/${category}/list?${params}`;

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

export async function getActor(
  personId: string,
  language: TLocales = "en"
): Promise<TActor | undefined> {
  const params = new URLSearchParams({
    language: getLang(language),
  }).toString();
  const url = `https://api.themoviedb.org/3/person/${personId}?${params}`;

  return fetchData(url);
}

export async function getCombinedCredits(
  personId: string,
  language: TLocales = "en"
): Promise<{ cast: TMovieData[] } | undefined> {
  const params = new URLSearchParams({
    language: getLang(language),
  }).toString();
  const url = `https://api.themoviedb.org/3/person/${personId}/combined_credits?${params}`;

  return fetchData(url);
}

export async function getSimilarMovie(
  category: TCategory,
  id: string,
  language: TLocales = "en"
): Promise<TResponse<TMovieData[]> | undefined> {
  const params = new URLSearchParams({
    language: getLang(language),
  }).toString();
  const url = `https://api.themoviedb.org/3/${category}/${id}/similar?${params}`;
  return fetchData(url);
}

export async function getSeriesList(
  id: string,
  seasonNumber: number = 1,
  language: TLocales = "en"
): Promise<TResponseSeasons<TSeries[]> | undefined> {
  const params = new URLSearchParams({
    language: getLang(language),
  }).toString();
  const url = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?${params}`;
  return fetchData(url);
}

export async function getReviews(
  category: TCategory,
  id: string,
  language: TLocales = "en"
): Promise<TResponse<TReview[]> | undefined> {
  const params = new URLSearchParams({
    language: getLang(language),
  }).toString();
  const url = `https://api.themoviedb.org/3/${category}/${id}/reviews?${params}`;
  return fetchData(url);
}

export async function getSearchResults(
  keyword: string,
  language: TLocales = "en"
): Promise<TResponse<TSearchResult[]> | undefined> {
  const params = new URLSearchParams({
    include_adult: "true",
    query: keyword.toString(),
    language: getLang(language),
  }).toString();
  const url = `https://api.themoviedb.org/3/search/multi?${params}`;
  return fetchData(url);
}
