import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { getMovieList } from "@/actions/fetchMovie";
import MovieBlock from "@/components/MovieCard";
import PageContainer from "@/components/PageContainer";
import { TLocales } from "@/i18n/routing";
import { TListType } from "@/types/types";

export const revalidate = 3600;

const title = {
    popular: "Discover.Popular.title",
    top_rated: "Discover.Top Rated.title",
    upcoming: "Discover.Upcoming.title",
};

export async function generateMetadata(props: Props) {
    const params = await props.params;

    const {
        locale,
        category
    } = params;

    const t = await getTranslations({locale});
    return {
        title: t(title[category] as any),
    };
}

type Props = {
    params: Promise<{
        category: TListType;
        id: string;
        locale: TLocales;
    }>;
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
};

export default async function page(props: Props) {
    const searchParams = await props.searchParams;
    const params = await props.params;
    if (!["upcoming", "top_rated", "popular"].includes(params.category))
        return notFound();
    const t = await getTranslations();
    const {page} = searchParams;
    const data = await getMovieList(params.category, params.locale, Number(page));

    return (
        <PageContainer
            data={data}
            title={t(title[params.category] as any)}
        >
            {data?.results?.map((movie) => (
                <MovieBlock
                    category="movie"
                    key={movie.id}
                    movie={movie}
                />
            ))}
        </PageContainer>
    );
}
