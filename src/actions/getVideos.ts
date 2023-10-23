"use server";

type Props = {
  id: number;

  results: Video[];
};

export type Video = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export default async function getVideos(
  id: string
): Promise<Props | undefined> {
  const url = `https://api.themoviedb.org/3/movie/${id}/videos`;
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
