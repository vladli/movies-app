import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { redirect } from "next/navigation";
import { Metadata } from "next/types";
import { getServerSession } from "next-auth";

import Logo from "@/components/Logo";
import { authOptions } from "@/lib/authOptions";

import LoginForm from "./LoginForm";
import { useTranslations } from "next-intl";

function Translate({ children }: { children: (t: any) => React.ReactNode }) {
  const t = useTranslations();
  return <>{children(t)}</>;
}

export default async function login() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return (
    <Translate>
      {(t) => (
        <section className="flex h-[100dvh] flex-col items-center">
          <Logo className="relative top-5" />
          <div className="flex h-full items-center justify-center">
            <Card className="w-[85dvw] sm:w-[30rem]">
              <CardBody className="flex flex-col gap-4">
                <CardHeader className="flex justify-center text-xl font-medium">
                  {t("Auth.title")}
                </CardHeader>
                <LoginForm />
              </CardBody>
            </Card>
          </div>
        </section>
      )}
    </Translate>
  );
}
