"use server";

import type {Prisma} from "@prisma/client";
import {getServerSession} from "next-auth";

import {authOptions} from "@/lib/authOptions";
import {prisma} from "@/lib/prisma";
import {TMovieData} from "@/types/types";

type TAction = "add" | "delete";

export async function editFavorites(
    action: TAction = "add",
    mediaType: string,
    data: TMovieData
) {
    const session = await getServerSession(authOptions);
    if (!session) throw "Error.";

    const addMovie = {
        id: data.id,
        media_type: mediaType,
        title: data.title || data.name,
        poster_path: data.poster_path,
        release_date: data.release_date || data.first_air_date,
        vote_average: data.vote_average,
    };
    try {
        if (action == "add") {
            await prisma.user.update({
                where: {id: session?.user?.id},
                data: {
                    favoriteMovies: {
                        push: addMovie,
                    },
                },
            });

            return "success";
        } else if (action == "delete") {
            const user = await prisma.user.findUnique({
                where: {id: session?.user?.id},
            });

            const findMovie = user?.favoriteMovies.filter(
                //@ts-ignore
                (movie) => movie?.id !== data.id
            ) as Prisma.InputJsonValue[];
            await prisma.user.update({
                where: {id: session?.user?.id},
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
