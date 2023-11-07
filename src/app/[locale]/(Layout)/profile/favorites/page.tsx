import React from "react";
import { Metadata } from "next/types";
import { getTranslator } from "next-intl/server";

import Container from "./Container";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslator(params.locale, "ROOT");
  return {
    title: t("Favorites.Profile.Favorites.title"),
  };
}

export default function Page() {
  return <Container />;
}
