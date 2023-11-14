import React from "react";
import type { Metadata } from "next/types";

import { getActors } from "@/actions/fetchMovie";
import ActorBlock from "@/components/ActorBlock";
import PageContainer from "@/components/PageContainer";
import { useTranslations } from "next-intl";
import { TLocales } from "@/navigation";

export const revalidate = 3600;

export const metadata: Metadata = { title: "Actors" };

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
