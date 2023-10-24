import React from "react";
import { AiFillStar } from "react-icons/ai";

import { cn } from "@/lib/utils";

type Props = {
  score: number | undefined;
  className?: string;
};

export default function MovieRating({ score, className }: Props) {
  if (!score) return null;
  return (
    <div
      className={cn(
        "absolute z-20 bg-red-500 py-1 px-2 flex items-center gap-1",
        className
      )}
    >
      <AiFillStar />
      {score?.toFixed(1)}
    </div>
  );
}
