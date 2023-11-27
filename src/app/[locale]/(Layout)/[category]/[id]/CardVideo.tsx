"use client";
import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";

import { TVideo } from "@/types/types";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  data: TVideo[] | undefined;
};

export default function CardVideo({ isOpen, onOpenChange, data }: Props) {
  const opts: YouTubeProps["opts"] = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  let video = data?.find((video) => video.type === "Trailer");
  if (!video && data) video = data[0];

  if (!data || !video) return null;
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="3xl"
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1"></ModalHeader>
          <ModalBody>
            <YouTube
              className="relative my-4 flex justify-center"
              iframeClassName="w-[28rem] max-w-[50rem] lg:w-[80vw] h-[30rem]"
              opts={opts}
              videoId={video?.key}
            />
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
}
