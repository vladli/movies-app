import React from "react";
import { Skeleton } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="relative">
      <div className="relative top-6 flex flex-col items-center justify-around gap-2 p-6 lg:flex-row-reverse lg:items-start">
        <Skeleton className="relative h-[670px] w-[28rem] max-w-[80vw] rounded-xl" />
        <div className="z-10 flex flex-col items-center gap-3 lg:items-start">
          <Skeleton className="h-4 w-[80vw] max-w-[28rem] rounded-md" />
          <Skeleton className="h-4 w-[80vw] max-w-[28rem] rounded-md" />
          <div>
            <Skeleton className="flex h-[20rem] w-[32rem] max-w-[32rem] rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
