import { Card } from "@nextui-org/react";
import React from "react";
import LoginForm from "./components/LoginForm";
import Link from "next/link";

export default function login() {
  return (
    <section className="p-4 flex flex-col items-center h-[100dvh]">
      <div className="flex">
        <Link href="/">logo</Link>
      </div>
      <div className="flex justify-center items-center h-full">
        <Card className="w-[85dvw] sm:w-[30rem]">
          <LoginForm />
        </Card>
      </div>
    </section>
  );
}
