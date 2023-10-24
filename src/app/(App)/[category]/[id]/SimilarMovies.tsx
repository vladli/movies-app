import React from "react";

import type { Movie } from "@/actions/getMovie";
import type { TVShow } from "@/actions/getSeries";

export default function SimilarMovies({ data }: { data: Movie | undefined }) {
  return <section className="my-4 p-4">SimilarMovies</section>;
}
