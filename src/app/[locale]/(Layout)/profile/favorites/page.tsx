import React from "react";
import { Metadata } from "next/types";
import { createTranslator } from "next-intl";

import Container from "./Container";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const messages = (await import(`/dictionaries/${params.locale}.json`))
    .default;
  const t = createTranslator({ locale: params.locale, messages });
  return {
    title: t("ROOT.Favorites.Profile.Favorites.title"),
  };
}

type Props = {
  params: {
    locale: string;
  };
};

export default function Page() {
  return <Container />;
}
