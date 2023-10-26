import React from "react";
import { Card } from "@nextui-org/react";
import { Metadata } from "next/types";

import Logo from "@/components/Logo";

import LoginForm from "./components/LoginForm";

export const metadata: Metadata = {
  title: "Authorization",
};

export default async function login() {
  return (
    <section className="flex h-[100dvh] flex-col items-center">
      <Logo className="relative top-5" />
      <div className="flex h-full items-center justify-center">
        <Card className="w-[85dvw] sm:w-[30rem]">
          <LoginForm />
        </Card>
      </div>
    </section>
  );
}
