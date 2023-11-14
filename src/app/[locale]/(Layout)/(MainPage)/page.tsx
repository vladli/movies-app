import { getGenres, getMovieList } from "@/actions/fetchMovie";
import type { TLocales } from "@/navigation";

import CategoryBlock from "./CategoryBlock";
import PopularMovies from "./PopularMovies";

export const revalidate = 3600;

type Props = {
  params: { locale: TLocales };
};

export default async function Page({ params }: Props) {
  const movies = await getMovieList("popular", params.locale);
  const genres = await getGenres("movie", params.locale);
  return (
    <>
      <PopularMovies
        data={movies?.results}
        genres={genres?.genres}
      />
      <CategoryBlock locale={params.locale} />
    </>
  );
}
