import React from "react";
import { Card } from "@nextui-org/react";
import { redirect } from "next/navigation";
import { Metadata } from "next/types";
import { getServerSession } from "next-auth";

import Logo from "@/components/Logo";
import { authOptions } from "@/lib/authOptions";

import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default async function page() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
  return (
    <section className="flex h-[100dvh] flex-col items-center">
      <Logo className="relative top-5" />
      <div className="flex h-full items-center justify-center">
        <Card className="w-[85dvw] sm:w-[30rem]">
          <RegisterForm />
        </Card>
      </div>
    </section>
  );
}
