import React from "react";

import { TCastMember, TMovieData, TResponse } from "@/types/types";

import Pagination from "./Pagination";

type Props = {
  children: React.ReactNode;
  title: string;
  data?: TResponse<TMovieData[] | TCastMember[]> | undefined;
};

export default function PageContainer({ children, title, data }: Props) {
  const totalResults = data?.total_results
    ? new Intl.NumberFormat().format(data.total_results)
    : 0;
  const totalPages =
    data && data?.total_pages >= 500 ? 500 : data?.total_pages || 1;
  return (
    <section className="flex flex-col items-center gap-10 p-4">
      <div className="flex flex-col place-self-center pl-2 lg:place-self-start">
        <h2 className="text-center text-4xl font-bold capitalize lg:text-start">
          {title}
        </h2>
        <h3 className="font-medium text-foreground-500">
          Total: {totalResults}
        </h3>
      </div>
      <div className="flex flex-wrap justify-evenly gap-4">{children}</div>
      <Pagination
        currentPage={data?.page}
        totalPages={totalPages}
      />
    </section>
  );
}
