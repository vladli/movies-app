import { TMovieData } from "@/types/types";
import React from "react";

export default function SimilarMovies({
  data,
}: {
  data: TMovieData | undefined;
}) {
  return <section className="my-4 p-4">SimilarMovies</section>;
}
