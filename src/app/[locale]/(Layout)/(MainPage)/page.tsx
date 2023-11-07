import { MessageKeys, useTranslations } from "next-intl";

import { getGenres, getMovieList } from "@/actions/fetchMovie";

import MovieBlock from "./MovieBlock";
import PopularMovies from "./PopularMovies";

export const revalidate = 3600;

async function PageData({ locale, t }: { locale: string; t: any }) {
  const [movies, upcoming, top, genres] = await Promise.all([
    getMovieList("popular", locale),
    getMovieList("upcoming", locale),
    getMovieList("top_rated", locale),
    getGenres("movie", locale),
  ]);
  return (
    <>
      <PopularMovies
        data={movies?.results}
        genres={genres?.genres}
      />
      <MovieBlock
        data={upcoming?.results}
        title={t("Discover.Upcoming.title")}
        type="upcoming"
      />
      <MovieBlock
        data={top?.results}
        title={t("Discover.Top Rated.title")}
      />
    </>
  );
}

export default function Page({ params }: { params: { locale: string } }) {
  const t = useTranslations();

  return (
    <PageData
      locale={params.locale}
      t={t}
    />
  );
}
