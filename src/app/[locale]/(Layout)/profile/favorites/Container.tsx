"use client";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import MovieCard from "@/components/MovieCard";
import PageContainer from "@/components/PageContainer";

export default function Container() {
  const t = useTranslations();
  const { data: session } = useSession();
  return (
    <PageContainer
      showPagination={false}
      title={t("Profile.Favorites.title")}
      total_results={session?.user?.favoriteMovies?.length}
    >
      {!session?.user?.favoriteMovies?.length
        ? t("Profile.Favorites.empty")
        : session?.user?.favoriteMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
    </PageContainer>
  );
}
