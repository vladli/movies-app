import React from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  data: string | undefined;
};

export default function FullBiography({ isOpen, onOpenChange, data }: Props) {
  if (!data) return null;
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1"></ModalHeader>
          <ModalBody className="prose font-medium text-foreground-500">
            <p>{data}</p>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
}
