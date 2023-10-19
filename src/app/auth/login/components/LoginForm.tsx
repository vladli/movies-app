"use client";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { MdMail } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CardBody, Divider, Input } from "@nextui-org/react";
import { hash } from "argon2";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { z } from "zod";
export const loginSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
});
type User = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ resolver: zodResolver(loginSchema) });

  const onSubmit = useCallback(async (data: User) => {
    const { error }: any = await signIn("emailAuth", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (error) {
      setErrorMessage(error);
    } else {
      setErrorMessage("");
    }
  }, []);
  return (
    <CardBody className="flex flex-col gap-4">
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          value="dev.vladli@gmail.com"
          {...register("email")}
          errorMessage={errors.email ? errors.email.message : null}
          label="Email"
          labelPlacement="outside"
          placeholder="you@example.com"
          startContent={
            <MdMail className="pointer-events-none shrink-0 text-2xl text-default-400" />
          }
        />
        <Input
          {...register("password")}
          errorMessage={errors.password ? errors.password.message : null}
          label="Password"
          labelPlacement="outside"
          placeholder="Enter your password"
          startContent={
            <MdMail className="pointer-events-none shrink-0 text-2xl text-default-400" />
          }
          type="password"
        />
        <Button
          color="primary"
          type="submit"
        >
          Submit
        </Button>
        {errorMessage ? (
          <div className="text-danger">{errorMessage}</div>
        ) : null}
      </form>
      <Divider />
      <Button
        className="bg-gray-200 font-medium text-black"
        onClick={() => signIn("google")}
        startContent={
          <Image
            alt=""
            height={20}
            src="/socials/google.svg"
            width={20}
          />
        }
      >
        Sign in with Google
      </Button>
    </CardBody>
  );
}
