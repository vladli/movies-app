"use client";
import { Accordion, AccordionItem, Avatar } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { getReviews } from "@/actions/fetchMovie";
import { TMDB_MINI_AVATAR } from "@/lib/constants";
import { TLocales } from "@/navigation";
import { TCategory } from "@/types/types";

type Props = {
  id: string;
  category: TCategory;
  locale: TLocales;
};

export default function Reviews({ id, category, locale }: Props) {
  const t = useTranslations();
  const { data } = useQuery({
    queryKey: ["getReviews", id, category, locale],
    queryFn: () => getReviews(category, id, locale),
  });
  if (!data?.results.length) return null;
  return (
    <motion.section
      animate={{ opacity: 1, x: 0, transition: { delay: 0.6 } }}
      className="flex flex-col items-center gap-4 p-4"
      initial={{ opacity: 0, x: -200 }}
    >
      <h2 className="my-4 text-center text-3xl font-bold lg:text-left">
        {t("MoviePage.Reviews")}
      </h2>
      <motion.div className="w-full">
        <Accordion
          defaultSelectedKeys="all"
          selectionMode="multiple"
          variant="splitted"
        >
          {data.results.slice(0, 10).map((review) => (
            <AccordionItem
              key={review.id}
              startContent={
                <Avatar
                  radius="lg"
                  src={
                    review.author_details.avatar_path
                      ? TMDB_MINI_AVATAR + review.author_details.avatar_path
                      : ""
                  }
                />
              }
              title={review.author}
            >
              {review.content}
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </motion.section>
  );
}
