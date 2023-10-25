"use server";

import { TCastMember } from "@/types/types";

export default async function getCast(
  category: string,
  id: string
): Promise<{ id: number; cast: TCastMember[] } | undefined> {
  const url = `https://api.themoviedb.org/3/${category}/${id}/credits`;
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
