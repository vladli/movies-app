import { Card } from "@nextui-org/react";
import { redirect } from "next/navigation";
import { Metadata } from "next/types";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";

import Logo from "@/components/Logo";
import { authOptions } from "@/lib/authOptions";

import LoginForm from "./LoginForm";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "ROOT",
  });
  return {
    title: t("Header.Auth.title"),
  };
}

export default async function login() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
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
