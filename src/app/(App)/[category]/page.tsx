import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDiscover } from "@/actions/fetchMovie";
import MovieBlock from "@/components/MovieBlock";
import PageContainer from "@/components/PageContainer";
import Pagination from "@/components/Pagination";
import { TCategory } from "@/types/types";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = params.category === "tv" ? "TV" : "Movies";
  return {
    title: title,
  };
}

type Props = {
  params: {
    category: TCategory;
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ params, searchParams }: Props) {
  if (!["movie", "tv"].includes(params.category)) return notFound();
  const { page } = searchParams;

  const data = await getDiscover(
    params.category,
    undefined,
    undefined,
    Number(page)
  );
  return (
    <PageContainer
      category="tv"
      data={data}
      title="TV"
    />
  );
}
