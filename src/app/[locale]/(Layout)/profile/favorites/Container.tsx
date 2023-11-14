"use client";
import React from "react";
import { useSession } from "next-auth/react";

import MovieCard from "@/components/MovieCard";
import PageContainer from "@/components/PageContainer";

export default function Container() {
  const { data: session } = useSession();
  return (
    <PageContainer
      showPagination={false}
      title="Favorites"
      total_results={session?.user?.favoriteMovies?.length}
    >
      {!session?.user?.favoriteMovies?.length
        ? "You did not add any movies to favorites yet."
        : session?.user?.favoriteMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
    </PageContainer>
  );
}
