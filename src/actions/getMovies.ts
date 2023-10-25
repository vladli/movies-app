"use server";

import { TMovieData, TResponse } from "@/types/types";

export default async function getMovies(
  page: number | undefined = 1
): Promise<TResponse<TMovieData[]> | undefined> {
  if (isNaN(Number(page))) {
    page = 1;
  }
  const params = new URLSearchParams({
    page: page.toString(),
  }).toString();
  const url = `https://api.themoviedb.org/3/trending/all/week?${params}`;
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
    if (response.status === 200) return response.json();
    return undefined;
  } catch (error) {
    console.error(error);
  }
}
