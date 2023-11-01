"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdMail } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Link,
  Spinner,
} from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
});
type User = z.infer<typeof loginSchema>;

const socials = [
  {
    id: "google",
    name: "Google",
    icon: "/socials/google.svg",
    className: "bg-gray-200 font-medium text-black",
  },
  {
    id: "kakao",
    name: "Kakao",
    icon: "/socials/kakao.svg",
    className: "bg-[#FEE500] font-medium text-black",
  },
];

export default function LoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<User>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: User) => {
    const { error }: any = await signIn("emailAuth", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (error) {
      setErrorMessage(error);
    } else {
      setErrorMessage("");
      router.replace("/");
    }
  };
  return (
    <CardBody className="flex flex-col gap-4">
      <CardHeader className="flex justify-center text-xl font-medium">
        Authorization
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
            <MdMail className="pointer-events-none shrink-0 text-2xl text-default-400" />
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
      <Divider />
      <div className="flex flex-col gap-2">
        {socials.map((social) => (
          <Button
            className={social.className}
            isDisabled={isSubmitting}
            key={social.id}
            onClick={() => signIn(social.id)}
            startContent={
              <Image
                alt=""
                height={20}
                src={social.icon}
                width={20}
              />
            }
          >
            Sign in with {social.name}
          </Button>
        ))}
      </div>
      <p className="flex justify-center gap-2">
        Do not have an account?
        <Link
          as={NextLink}
          href="/auth/register"
        >
          Sign Up
        </Link>
      </p>
    </CardBody>
  );
}
