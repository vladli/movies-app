import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import Logo from "@/components/Logo";
import { authOptions } from "@/lib/authOptions";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
  return (
    <section className="flex h-[100dvh] flex-col items-center">
      <Logo className="relative top-5" />
      <div className="flex h-full items-center justify-center">
        <Card className="w-[85dvw] sm:w-[30rem]">
          <CardBody className="flex flex-col gap-4">
            <CardHeader className="flex justify-center text-xl font-medium">
              Check your email
            </CardHeader>
            <div className="flex flex-col items-center gap-4">
              <p className="font-medium">
                A sign in link has been sent to your email address.
              </p>
              <Link
                className="text-xl font-normal underline"
                href="/"
              >
                Return Home
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
