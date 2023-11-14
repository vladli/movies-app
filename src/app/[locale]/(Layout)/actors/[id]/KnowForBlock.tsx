"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

import { getCombinedCredits } from "@/actions/fetchMovie";
import MovieCard from "@/components/MovieCard";
import useToggle from "@/hooks/useToggle";
import { useTranslations } from "next-intl";
import { TLocales } from "@/navigation";

type Props = {
  id: string;
  locale: TLocales;
};

export default function KnowForBlock({ id, locale }: Props) {
  const t = useTranslations();
  const { data } = useQuery({
    queryKey: ["actorKnownFor", id, locale],
    queryFn: () => getCombinedCredits(id, locale),
  });
  const [casts, setCasts] = useState(data?.cast);
  const [on, toggle] = useToggle();
  useEffect(() => {
    setCasts(data?.cast);
  }, [data]);

  useEffect(() => {
    if (!on) setCasts(data?.cast.slice(0, 10));
    else setCasts(data?.cast);
  }, [on]);

  return (
    <motion.section
      animate={{ opacity: 1, x: 0, transition: { delay: 0.6 } }}
      className="flex flex-col items-center gap-4 bg-gradient-to-b from-background/90 to-background p-4"
      initial={{ opacity: 0, x: -200 }}
    >
      <h2 className="my-4 text-center text-3xl font-bold lg:text-left">
        {t("Actors.KnownFor")}
      </h2>
      <motion.div className="flex flex-wrap justify-around gap-4">
        {casts?.map((movie, i) => (
          <MovieCard
            key={i}
            movie={movie}
          />
        ))}
      </motion.div>
      {data && data?.cast.length > 10 && (
        <Button
          color="primary"
          onPress={toggle}
          size="lg"
        >
          {!on ? t("#ROOT.ButtonViewAll") : t("#ROOT.ButtonCollapse")}
        </Button>
      )}
    </motion.section>
  );
}
