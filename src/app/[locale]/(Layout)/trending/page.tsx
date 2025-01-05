import { getTranslations } from "next-intl/server";

import { getTrendingMovies } from "@/actions/fetchMovie";
import MovieCard from "@/components/MovieCard";
import PageContainer from "@/components/PageContainer";
import { TLocales } from "@/i18n/routing";

export const revalidate = 3600;

export async function generateMetadata(props: Props) {
    const params = await props.params;

    const {
        locale
    } = params;

    const t = await getTranslations({locale, namespace: "Trending"});
    return {
        title: t("title"),
    };
}

type Props = {
    params: Promise<{ locale: TLocales }>;
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
};

export default async function Home(props: Props) {
    const searchParams = await props.searchParams;
    const params = await props.params;
    const {page} = searchParams;
    const t = await getTranslations("Trending");
    const data = await getTrendingMovies(params.locale, Number(page));
    return (
        <PageContainer
            data={data}
            title={t("title")}
        >
            {data?.results?.map((movie) => (
                <MovieCard
                    category={movie.media_type}
                    key={movie.id}
                    movie={movie}
                />
            ))}
        </PageContainer>
    );
}
