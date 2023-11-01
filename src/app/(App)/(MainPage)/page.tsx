import { getServerSession } from "next-auth";

import { getGenres, getMovieList } from "@/actions/fetchMovie";
import { authOptions } from "@/lib/authOptions";

import MovieBlock from "./MovieBlock";
import PopularMovies from "./PopularMovies";

export const revalidate = 3600;

export default async function page() {
  const session = await getServerSession(authOptions);
  const [movies, upcoming, top, genres] = await Promise.all([
    getMovieList("popular"),
    getMovieList("upcoming"),
    getMovieList("top_rated"),
    getGenres("movie"),
  ]);
  return (
    <>
      <PopularMovies
        data={movies?.results}
        genres={genres?.genres}
      />
      <MovieBlock
        data={upcoming?.results}
        title="Upcoming Movies"
        type="upcoming"
      />
      <MovieBlock
        data={top?.results}
        title="Top Rated"
      />
    </>
  );
}
