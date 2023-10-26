import React from "react";
import { notFound } from "next/navigation";

import { getMovieList } from "@/actions/fetchMovie";
import MovieBlock from "@/components/MovieBlock";
import PageContainer from "@/components/PageContainer";
import Pagination from "@/components/Pagination";
import { TListType } from "@/types/types";

type Props = {
  params: {
    category: TListType;
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ params, searchParams }: Props) {
  if (!["upcoming", "top_rated", "popular"].includes(params.category))
    return notFound();
  const { page } = searchParams;
  const data = await getMovieList(params.category, Number(page));
  const title = params.category === "top_rated" ? "Top Rated" : params.category;
  return (
    <PageContainer
      data={data}
      title={title}
    />
  );
}
