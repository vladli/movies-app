"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { Tooltip } from "@nextui-org/react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useSession } from "next-auth/react";

import { editFavorites } from "@/actions/favorites";
import useToggle from "@/hooks/useToggle";
import { cn } from "@/lib/utils";
import { TMovieData } from "@/types/types";

type Props = {
  movie: TMovieData;
  mediaType?: "movie" | "tv";
  className?: string;
};

const iconVariants = {
  initial: { opacity: 0, display: "none" },
  animate: { opacity: 1, display: "block" },
  exit: { opacity: 0, display: "none" },
};

export default function MovieFavorite({
  movie,
  mediaType = "movie",
  className,
}: Props) {
  const { data: session, update } = useSession();
  const isFavorite = session?.user?.favoriteMovies?.some(
    (favorite) => +favorite.movieId === movie.id
  );
  const [on, toggle] = useToggle(isFavorite);
  const [loading, setLoading] = useState(false);

  const handleToggleFavorite = async (e: any) => {
    e.preventDefault();
    if (!session || loading) return;
    setLoading(true);
    const functionEdit = editFavorites(on ? "delete" : "add", mediaType, movie)
      .then(() => {
        if (!on) {
          const addMovie = {
            movieId: movie.id,
            dataType: mediaType,
            title: movie.title,
            image: movie.poster_path,
          };
          update({
            favoriteMovies: [
              ...(session?.user?.favoriteMovies || []),
              { ...addMovie },
            ],
          });
        } else {
          const findMovie =
            session?.user?.favoriteMovies &&
            session.user.favoriteMovies.filter(
              (data) => +data?.movieId !== movie.id
            );
          update({
            favoriteMovies: [...(findMovie || [])],
          });
        }
      })
      .finally(() => {
        setLoading(false);
        toggle();
      });
    toast.promise(functionEdit, {
      loading: "Loading...",
      success: !on ? "Added to favorites." : "Removed from favorites.",
      error: "Something went wrong...",
    });
  };

  return (
    <form onSubmit={handleToggleFavorite}>
      <Tooltip
        content={
          !session
            ? "Sign in to add to favorites"
            : !on
            ? "Add to favorites"
            : "Remove from favorites"
        }
        showArrow={true}
      >
        <motion.button
          className={cn(
            "absolute outline-none right-0 z-20 h-8 py-1 px-2 flex items-center gap-1",
            className
          )}
          disabled={!session || loading}
        >
          <AnimatePresence>
            {on ? (
              <motion.i
                animate="animate"
                exit="exit"
                initial="initial"
                key={1}
                variants={iconVariants}
              >
                <MdFavorite
                  color="#f31260"
                  size="1.5rem"
                />
              </motion.i>
            ) : (
              <motion.i
                animate="animate"
                exit="exit"
                initial="initial"
                key={2}
                variants={iconVariants}
              >
                <MdFavoriteBorder
                  color="#f31260"
                  size="1.5rem"
                />
              </motion.i>
            )}
          </AnimatePresence>
        </motion.button>
      </Tooltip>
    </form>
  );
}
