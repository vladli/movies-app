"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";

import MovieCard from "@/components/MovieCard";
import useToggle from "@/hooks/useToggle";
import { TMovieData } from "@/types/types";

type Props = {
  data: TMovieData[] | undefined;
};

export default function KnowForBlock({ data }: Props) {
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
        Known For
      </h2>
      <motion.div className="flex flex-wrap justify-around gap-4">
        {casts?.map((movie, i) => (
          <MovieCard
            key={i}
            movie={movie}
          />
        ))}
      </motion.div>
      {data && data?.length > 10 && (
        <Button
          color="primary"
          onPress={toggle}
          size="lg"
        >
          {!on ? "View all" : "Collapse"}
        </Button>
      )}
    </motion.section>
  );
}
