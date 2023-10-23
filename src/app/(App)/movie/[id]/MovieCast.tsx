"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";

import type { CastMember } from "@/actions/getCast";
import useToggle from "@/hooks/useToggle";

import CastCard from "./CastCard";

export default function MovieCast({
  data,
}: {
  data: CastMember[] | undefined;
}) {
  const [casts, setCasts] = useState(data);
  const [on, toggle] = useToggle();
  useEffect(() => {
    if (!on) setCasts(data?.slice(0, 10));
    else setCasts(data);
  }, [on]);
  return (
    <motion.section
      animate={{ opacity: 1, x: 0, transition: { delay: 0.6 } }}
      className="flex flex-col items-center gap-4 p-4"
      initial={{ opacity: 0, x: -200 }}
    >
      <h2 className="my-4 text-center text-3xl font-bold lg:text-left">
        Main Cast
      </h2>
      <motion.ul className="flex flex-wrap justify-around gap-4">
        {casts?.map((actor) => (
          <CastCard
            actor={actor}
            key={actor.id}
          />
        ))}
      </motion.ul>
      <Button
        color="primary"
        onClick={toggle}
        size="lg"
      >
        {!on ? "View all casts" : "Collapse"}
      </Button>
    </motion.section>
  );
}
