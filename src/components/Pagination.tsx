"use client";
import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Button, Pagination as NextPagination } from "@nextui-org/react";
import { useRouter } from "next/navigation";

type Props = {
  currentPage: number | undefined;
  totalPages: number | undefined;
};

export default function Pagination({ currentPage, totalPages = 1 }: Props) {
  const [page, setPage] = useState(currentPage || 1);
  const router = useRouter();
  const handleChange = (page: number) => {
    setPage(page);
    router.replace("?page=" + page, { scroll: false });
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="hidden min-[430px]:block">
        <NextPagination
          color="secondary"
          onChange={handleChange}
          page={currentPage}
          showControls
          total={totalPages}
        />
      </div>
      <div className="flex gap-2 min-[430px]:hidden">
        <Button
          color="secondary"
          isDisabled={page === 1}
          onPress={() => handleChange(page - 1)}
        >
          <AiOutlineArrowLeft />
        </Button>
        <Button
          color="secondary"
          isDisabled={page === totalPages}
          onPress={() => handleChange(page + 1)}
        >
          <AiOutlineArrowRight />
        </Button>
      </div>
    </>
  );
}
