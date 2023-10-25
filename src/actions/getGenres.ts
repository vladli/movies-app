"use server";

import { TGenre } from "@/types/types";

export default async function getGenres(
  category = "movie"
): Promise<{ genres: TGenre[] } | undefined> {
  const url = `https://api.themoviedb.org/3/genre/${category}/list`;
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
