"use server";

type Props = {
  page: number;
  next: string;
  entries: number;
  results: Movie[];
};

export type Movie = {
  _id: string;
  id: string;
  primaryImage: Record<string, any>;
  titleType: Record<string, any>;
  titleText: Record<string, any>;
  originalTitleText: Record<string, any>;
  releaseYear: Record<string, any>;
  releaseDate: null | string;
};

export default async function getMovies(): Promise<Props | undefined> {
  const params = new URLSearchParams({
    list: "top_boxoffice_200",
  }).toString();
  const url = `https://moviesdatabase.p.rapidapi.com/titles/random?${params}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API as string,
      "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
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
