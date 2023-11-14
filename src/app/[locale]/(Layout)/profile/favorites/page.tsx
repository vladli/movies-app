import React from "react";
import { getTranslations } from "next-intl/server";

import { TLocales } from "@/navigation";

import Container from "./Container";

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "Profile" });
  return {
    title: t("Favorites.title"),
  };
}

type Props = {
  params: { locale: TLocales };
};

export default function Page() {
  return <Container />;
}
