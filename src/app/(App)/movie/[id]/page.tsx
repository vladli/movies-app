import React from "react";

import getMovie from "@/actions/getMovie";
import getVideos from "@/actions/getVideos";

import CardVideo from "./CardVideo";
import MovieCard from "./MovieCard";

export default async function page({ params }: { params: { id: string } }) {
  const [movie, video] = await Promise.all([
    getMovie(params.id),
    getVideos(params.id),
  ]);
  if (!movie) return null;

  return (
    <>
      <MovieCard data={movie} />
      <CardVideo data={video?.results} />
    </>
  );
}
