"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import useToggle from "@/hooks/useToggle";
import { TCastMember } from "@/types/types";

import CastCard from "./CastCard";

export default function MovieCast({
  data,
}: {
  data: TCastMember[] | undefined;
}) {
  const t = useTranslations();
  const [casts, setCasts] = useState(data);
  const [on, toggle] = useToggle();
  useEffect(() => {
    if (!on) setCasts(data?.slice(0, 10));
    else setCasts(data);
  }, [on]);
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
      {data && data?.length > 10 && (
        <Button
          color="primary"
          onClick={toggle}
          size="lg"
        >
          {!on ? t("ROOT.viewAllButton") : t("ROOT.collapseButton")}
        </Button>
      )}
    </motion.section>
  );
}
