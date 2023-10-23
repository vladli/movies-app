"use client";
import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";

import type { Video } from "@/actions/getVideos";

export default function CardVideo({ data }: { data: Video[] | undefined }) {
  const opts: YouTubeProps["opts"] = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  if (!data) return null;
  return (
    <YouTube
      className="relative my-4 flex justify-center"
      iframeClassName="w-[28rem] max-w-[50rem] lg:w-[80vw] h-[30rem]"
      opts={opts}
      videoId={data[0].key}
    />
  );
}
