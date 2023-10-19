import React from "react";
import { Card } from "@nextui-org/react";
import { hash } from "argon2";
import Link from "next/link";

import LoginForm from "./components/LoginForm";

export default async function login() {
  return (
    <section className="flex h-[100dvh] flex-col items-center p-4">
      <div className="flex">
        <Link href="/">logo</Link>
      </div>
      <div className="flex h-full items-center justify-center">
        <Card className="w-[85dvw] sm:w-[30rem]">
          <LoginForm />
        </Card>
      </div>
    </section>
  );
}
