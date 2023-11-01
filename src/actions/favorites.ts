"use server";

import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { TMovieData } from "@/types/types";

type TAction = "add" | "delete";
export async function editFavorites(
  action: TAction = "add",
  mediaType: string,
  data: TMovieData
) {
  const session = await getServerSession(authOptions);
  const addMovie = {
    movieId: data.id,
    dataType: mediaType,
    title: data.title || data.name,
    image: data.poster_path,
  };
  try {
    if (action == "add") {
      await prisma.user.update({
        where: { id: session?.user?.id },
        data: {
          favoriteMovies: {
            push: addMovie,
          },
        },
      });
      return "success";
    } else if (action == "delete") {
      const user = await prisma.user.findUnique({
        where: { id: session?.user?.id },
      });

      const findMovie = user?.favoriteMovies.filter(
        //@ts-ignore
        (movie) => movie?.movieId !== data.id
      ) as Prisma.InputJsonValue[];
      await prisma.user.update({
        where: { id: session?.user?.id },
        data: {
          favoriteMovies: {
            set: findMovie,
          },
        },
      });
      return "success";
    }
  } catch (error) {
    console.log(error);
  }
}

export async function checkFavorites(movieId?: number) {
  const session = await getServerSession(authOptions);

  if (!session) throw "Error";
  const movie = {
    movieId: 123,
    dataType: "movie",
    title: "Loser",
    image: "img",
  };
  try {
    const data = await prisma.user.findFirst({
      where: { id: session.user?.id },
    });
    return data?.favoriteMovies;
  } catch (error) {
    console.log(error);
  }
}