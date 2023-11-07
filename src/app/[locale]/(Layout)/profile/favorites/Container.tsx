"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import MovieCard from "@/components/MovieCard";
import PageContainer from "@/components/PageContainer";

export default function Container() {
  const { data: session } = useSession();
  const t = useTranslations();
  return (
    <PageContainer
      showPagination={false}
      title={t("ROOT.Favorites.Profile.Favorites.title")}
      total_results={session?.user?.favoriteMovies?.length}
    >
      {!session?.user?.favoriteMovies?.length
        ? t("ROOT.Favorites.Profile.Favorites.empty")
        : session?.user?.favoriteMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
    </PageContainer>
  );
}
