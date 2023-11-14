import React from "react";
import { useTranslations } from "next-intl";

import { TCastMember, TMovieData, TResponse } from "@/types/types";

import Pagination from "./Pagination";

type Props = {
  children: React.ReactNode;
  title: any;
  data?: TResponse<TMovieData[] | TCastMember[]> | undefined;
  total_results?: number;
  pages?: number;
  showPagination?: boolean;
};

export default function PageContainer({
  children,
  title,
  data,
  total_results = 0,
  pages = 1,
  showPagination = true,
}: Props) {
  const t = useTranslations();
  const totalResults = data?.total_results
    ? new Intl.NumberFormat().format(data.total_results)
    : new Intl.NumberFormat().format(total_results);
  const totalPages =
    data && data?.total_pages >= 500 ? 500 : data?.total_pages || pages;
  return (
    <section className="flex flex-col items-center gap-10 p-4">
      <div className="flex flex-col place-self-center pl-2 lg:place-self-start">
        <h2 className="text-center text-4xl font-bold capitalize lg:text-start">
          {title}
        </h2>
        <h3 className="text-center font-medium text-foreground-500 lg:text-start">
          {t("#ROOT.Total", { results: totalResults })}
        </h3>
      </div>
      <div className="flex flex-wrap justify-evenly gap-4">{children}</div>
      {showPagination ? (
        <Pagination
          currentPage={data?.page}
          totalPages={totalPages}
        />
      ) : null}
    </section>
  );
}
