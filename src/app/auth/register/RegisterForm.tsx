"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdLock, MdMail } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  CardBody,
  CardHeader,
  Input,
  Link,
  Spinner,
} from "@nextui-org/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { z } from "zod";

import { createUser } from "@/actions/createUser";

export const registerSchema = z
  .object({
    email: z.string().email().min(3),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match, please try again.",
    path: ["confirmPassword"],
  });
type User = z.infer<typeof registerSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<User>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: User) => {
    const { error }: any = await createUser(data);
    if (error) {
      setErrorMessage(error);
    } else {
      setErrorMessage("");
      signIn("emailAuth", {
        email: data.email,
        password: data.password,
        redirect: false,
      }).then(() => router.replace("/"));
    }
  };
  return (
    <CardBody className="flex flex-col gap-4">
      <CardHeader className="flex justify-center text-xl font-medium">
        Create your account
      </CardHeader>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
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
            <MdLock className="pointer-events-none shrink-0 text-2xl text-default-400" />
          }
          type="password"
        />
        <Input
          {...register("confirmPassword")}
          errorMessage={
            errors.confirmPassword ? errors.confirmPassword.message : null
          }
          label="Repeat your password"
          labelPlacement="outside"
          placeholder="Enter your password one more time"
          startContent={
            <MdLock className="pointer-events-none shrink-0 text-2xl text-default-400" />
          }
          type="password"
        />
        <Button
          color="primary"
          isDisabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? (
            <Spinner
              classNames={{
                circle1: "border-b-white",
                circle2: "border-b-white",
              }}
              size="sm"
            />
          ) : (
            "Submit"
          )}
        </Button>
        {errorMessage ? (
          <div className="text-danger">{errorMessage}</div>
        ) : null}
      </form>
      <p className="flex justify-center gap-2">
        Already have an account?
        <Link
          as={NextLink}
          href="/auth/login"
        >
          Sign In
        </Link>
      </p>
    </CardBody>
  );
}
