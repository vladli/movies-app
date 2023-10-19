"use client";
import { CardBody, Input, Button, Divider } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { MdMail } from "react-icons/md";

export default function LoginForm() {
  return (
    <CardBody className="flex flex-col gap-4">
      <form className="flex flex-col gap-2">
        <Input
          type="email"
          label="Email"
          placeholder="you@example.com"
          labelPlacement="outside"
          startContent={
            <MdMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          labelPlacement="outside"
          startContent={
            <MdMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
        <Button color="primary">Submit</Button>
      </form>
      <Divider />
      <Button
        className="bg-gray-200 text-black font-medium"
        onClick={() => signIn("google")}
        startContent={
          <Image
            src="/socials/google.svg"
            alt=""
            width={20}
            height={20}
          />
        }
      >
        Sign in with Google
      </Button>
    </CardBody>
  );
}
