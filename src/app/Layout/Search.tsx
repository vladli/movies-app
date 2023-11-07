"use client";
import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import { Input, Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { getSearchResults } from "@/actions/fetchMovie";
import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function Search({ className }: Props) {
  const [active, setActive] = useState(false);
  const [search, setSearch] = useState("");
  const value = useDebounce(search, 500);
  const { data } = useQuery({
    queryKey: ["search", value],
    queryFn: () => getSearchResults(value),
    enabled: !!value,
  });
  const actors = data?.results
    .slice(0, 5)
    .filter((result: any) => result.media_type === "person");
  const movies = data?.results
    .slice(0, 5)
    .filter((result: any) => result.media_type === "movie");
  const tvSeries = data?.results
    .slice(0, 5)
    .filter((result: any) => result.media_type === "tv");
  return (
    <div className={cn("relative", className)}>
      <Input
        className="w-[7rem] sm:w-[10rem]"
        isClearable
        onBlur={() => setActive(false)}
        onChange={(e) => setSearch(e.target.value)}
        onClear={() => setSearch("")}
        onFocus={() => setActive(true)}
        placeholder="Search..."
        size="sm"
        startContent={<MdSearch />}
        value={search}
      />
      {active && data && search && (
        <div
          className="absolute top-11 w-[10rem] rounded-small border-small border-default-200 bg-content1 px-1 py-2"
          onBlur={() => setActive(false)}
          onFocus={() => setActive(true)}
        >
          <Listbox
            aria-label="Actions"
            disabledKeys={["unknown"]}
            onAction={() => setActive(false)}
          >
            <ListboxSection
              showDivider
              title="Actors"
            >
              {actors?.length ? (
                actors.map((actor) => (
                  <ListboxItem
                    as={Link}
                    href={`/actors/${actor.id}`}
                    key={actor.id}
                  >
                    {actor.name}
                  </ListboxItem>
                ))
              ) : (
                <ListboxItem key="unknown">No items</ListboxItem>
              )}
            </ListboxSection>
            <ListboxSection
              showDivider
              title="Movies"
            >
              {movies?.length ? (
                movies.map((movie) => (
                  <ListboxItem
                    as={Link}
                    href={`/movie/${movie.id}`}
                    key={movie.id}
                  >
                    {movie.title}
                  </ListboxItem>
                ))
              ) : (
                <ListboxItem key="unknown">No items</ListboxItem>
              )}
            </ListboxSection>
            <ListboxSection title="TV">
              {tvSeries?.length ? (
                tvSeries.map((movie) => (
                  <ListboxItem
                    as={Link}
                    href={`/tv/${movie.id}`}
                    key={movie.id}
                  >
                    {movie.name}
                  </ListboxItem>
                ))
              ) : (
                <ListboxItem key="unknown">No items</ListboxItem>
              )}
            </ListboxSection>
          </Listbox>
        </div>
      )}
    </div>
  );
}
