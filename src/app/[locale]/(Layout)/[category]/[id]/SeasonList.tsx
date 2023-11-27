"use client";
import { useState } from "react";
import { Card, CardBody, Chip, Image, Tab, Tabs } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { getSeriesList } from "@/actions/fetchMovie";
import { TMDB_POSTER_780 } from "@/lib/constants";
import { TLocales } from "@/navigation";
import { TMovieData } from "@/types/types";

type Props = {
  tv: TMovieData;
  id: string;
  locale: TLocales;
};

function toHoursAndMinutes(totalMinutes: number) {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

export default function SeasonList({ tv, id, locale }: Props) {
  const t = useTranslations();
  const [selectedTab, setSelectedTab] = useState<any>(
    tv.seasons ? tv.seasons[0].season_number : 1
  );
  const { data } = useQuery({
    queryKey: ["seriesList", id, selectedTab, locale],
    queryFn: () => getSeriesList(id, selectedTab, locale),
  });
  console.log(data, selectedTab, id, locale);
  return (
    <motion.section
      animate={{ opacity: 1, x: 0, transition: { delay: 0.6 } }}
      className="flex flex-col items-center gap-4 p-4"
      initial={{ opacity: 0, x: -200 }}
    >
      <h2 className="my-4 text-center text-3xl font-bold lg:text-left">
        {t("MoviePage.SeasonList")}
      </h2>
      <Tabs
        className="place-self-start"
        classNames={{
          tabList:
            "w-full gap-x-4 flex-wrap relative rounded-none border-b border-divider",
          cursor: "w-full",
          tab: "max-w-fit px-0 h-12",
        }}
        color="primary"
        onSelectionChange={setSelectedTab}
        selectedKey={selectedTab}
        variant="underlined"
      >
        {tv?.seasons?.map((season) => (
          <Tab
            className="flex flex-col gap-2"
            key={season.season_number}
            title={
              <div className="flex items-center space-x-2">
                <span>{season.name}</span>
                <Chip
                  size="sm"
                  variant="faded"
                >
                  {season.episode_count}
                </Chip>
              </div>
            }
          >
            {data?.episodes.map((episode) => (
              <Card
                className="border-none bg-background/60 dark:bg-default-100/50"
                key={episode.id}
                shadow="sm"
              >
                <CardBody>
                  <div className="grid grid-cols-2 items-center justify-center gap-6 lg:grid-cols-12 lg:gap-4">
                    <div className="relative col-span-8 lg:col-span-4">
                      <Image
                        alt="Album cover"
                        className="max-h-[300px] object-contain"
                        height={300}
                        removeWrapper
                        src={TMDB_POSTER_780 + episode.still_path}
                        width="100%"
                      />
                    </div>

                    <div className="col-span-8 flex flex-col">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-0">
                          <h3 className="font-semibold text-foreground/90">
                            {episode.name}
                          </h3>
                          <p className="text-small text-foreground/80">
                            {toHoursAndMinutes(episode.runtime)}
                          </p>
                          <p className="mt-2">{episode.overview}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </Tab>
        ))}
      </Tabs>
    </motion.section>
  );
}
