import React from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import { getActors } from "@/actions/fetchMovie";
import ActorBlock from "@/components/ActorBlock";
import PageContainer from "@/components/PageContainer";
import { TLocales } from "@/navigation";

export const revalidate = 3600;

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "Actors" });
  return {
    title: t("title"),
  };
}

type Props = {
  params: {
    locale: TLocales;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

function Translate({ children }: { children: (t: any) => React.ReactNode }) {
  const t = useTranslations();
  return <>{children(t)}</>;
}

export default async function page({ params, searchParams }: Props) {
  const { page } = searchParams;
  const actors = await getActors(Number(page), params.locale);
  return (
    <Translate>
      {(t) => (
        <PageContainer
          data={actors}
          title={t("Actors.title")}
        >
          {actors?.results.map((actor) => (
            <ActorBlock
              actor={actor}
              key={actor.id}
            />
          ))}
        </PageContainer>
      )}
    </Translate>
  );
}
