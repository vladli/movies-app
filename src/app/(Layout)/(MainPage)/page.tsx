import { getGenres, getMovieList } from "@/actions/fetchMovie";

import CategoryBlock from "./CategoryBlock";
import PopularMovies from "./PopularMovies";

export const revalidate = 3600;

export default async function Page() {
  const movies = await getMovieList("popular");
  const genres = await getGenres("movie");
  return (
    <>
      <PopularMovies
        data={movies?.results}
        genres={genres?.genres}
      />
      <CategoryBlock />
    </>
  );
}
