"use client";
import React from "react";
import { Button, Pagination as NextPagination } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  currentPage: number | undefined;
  totalPages: number | undefined;
};

export default function Pagination({ currentPage, totalPages = 1 }: Props) {
  const router = useRouter();
  const handleChange = (page: number) => {
    router.push("?page=" + page, { scroll: false });
  };
  return (
    <div>
      <NextPagination
        color="secondary"
        onChange={handleChange}
        page={currentPage}
        total={totalPages}
      />
    </div>
  );
}
