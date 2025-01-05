import { getGenres, getMovieList } from "@/actions/fetchMovie";
import { TLocales } from "@/i18n/routing";

import CategoryBlock from "./CategoryBlock";
import PopularMovies from "./PopularMovies";

export const revalidate = 3600;

type Props = {
    params: Promise<{ locale: TLocales }>;
};

export default async function Page(props: Props) {
    const params = await props.params;
    const movies = await getMovieList("popular", params.locale);
    const genres = await getGenres("movie", params.locale);
    return (
        <>
            <PopularMovies
                data={movies?.results}
                genres={genres?.genres}
            />
            <CategoryBlock locale={params.locale}/>
        </>
    );
}
