"use client";
import React from "react";
import {
  MdOutlineArrowBack,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function PageBack() {
  const router = useRouter();
  return (
    <Button
      className="absolute left-2 top-2 z-50 flex items-center font-medium"
      onClick={() => router.back()}
      size="sm"
      startContent={<MdOutlineKeyboardDoubleArrowLeft size="1.1rem" />}
      variant="ghost"
    >
      BACK
    </Button>
  );
}
