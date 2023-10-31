"use client";
import { Pagination as NextPagination } from "@nextui-org/react";
import { useRouter } from "next/navigation";

type Props = {
  currentPage: number | undefined;
  totalPages: number | undefined;
};

export default function Pagination({ currentPage, totalPages = 1 }: Props) {
  const router = useRouter();
  const handleChange = (page: number) => {
    router.replace("?page=" + page, { scroll: false });
    window.scrollTo(0, 0);
  };

  return (
    <>
      <NextPagination
        color="secondary"
        onChange={handleChange}
        page={currentPage}
        showControls
        total={totalPages}
      />
    </>
  );
}
