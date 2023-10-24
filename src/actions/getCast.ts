"use server";

type Movie = {
  id: number;
  cast: CastMember[];
  crew?: CastMember[];
};

export type CastMember = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export default async function getCast(
  category: string,
  id: string
): Promise<Movie | undefined> {
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
    return response.json();
  } catch (error) {
    console.error(error);
  }
}
