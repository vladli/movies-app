import React from "react";
import { Metadata } from "next/types";
import { getTranslations } from "next-intl/server";

import Container from "./Container";

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
    title: t("Favorites.Profile.Favorites.title"),
  };
}

export default function Page() {
  return <Container />;
}
