import { TGenre } from "@/types/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterGenreNamesByIDs(genreId: number, allGenres: TGenre[]) {
  const genre = allGenres.find((genre) => genre.id === genreId);

  return genre ? genre.name : null;
}
