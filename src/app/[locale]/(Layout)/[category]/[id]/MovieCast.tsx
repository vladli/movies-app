"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { getCast } from "@/actions/fetchMovie";
import useToggle from "@/hooks/useToggle";
import { TLocales } from "@/navigation";
import { TCategory } from "@/types/types";

import CastCard from "./CastCard";

type Props = {
  category: TCategory;
  id: string;
  locale: TLocales;
};

export default function MovieCast({ category, id, locale }: Props) {
  const t = useTranslations();
  const { data } = useQuery({
    queryKey: ["movieCast", category, id, locale],
    queryFn: () => getCast(category, id, locale),
  });
  const [casts, setCasts] = useState(data?.cast);
  const [on, toggle] = useToggle();
  useEffect(() => {
    setCasts(data?.cast?.slice(0, 10));
  }, [data]);

  useEffect(() => {
    if (!on) setCasts(data?.cast?.slice(0, 10));
    else setCasts(data?.cast);
  }, [on]);
  if (!data?.cast.length) return null;
  return (
    <motion.section
      animate={{ opacity: 1, x: 0, transition: { delay: 0.6 } }}
      className="flex flex-col items-center gap-4 bg-gradient-to-b from-background/90 to-background p-4"
      initial={{ opacity: 0, x: -200 }}
    >
      <h2 className="my-4 text-center text-3xl font-bold lg:text-left">
        {t("MoviePage.MainCast")}
      </h2>
      <motion.ul className="flex flex-wrap justify-around gap-4">
        {casts?.map((actor) => (
          <CastCard
            actor={actor}
            key={actor.id}
          />
        ))}
      </motion.ul>
      {data && data?.cast.length > 10 && (
        <Button
          color="primary"
          onClick={toggle}
          size="lg"
        >
          {!on ? t("#ROOT.ButtonViewAll") : t("#ROOT.ButtonCollapse")}
        </Button>
      )}
    </motion.section>
  );
}
