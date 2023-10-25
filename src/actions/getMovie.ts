"use server";

import { TMovieData, TResponse } from "@/types/types";

export default async function getMovie(
  type = "movie",
  id: string
): Promise<TMovieData | undefined> {
  const params = new URLSearchParams({
    append_to_response: "videos",
  }).toString();
  const url = `https://api.themoviedb.org/3/${type}/${id}?${params}`;
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
