"use client";
import { useForm } from "react-hook-form";
import { MdMail } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Spinner,
} from "@nextui-org/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(1),
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
    id: "github",
    name: "GitHub",
    icon: "/socials/github.svg",
    className: "bg-[#333] font-medium text-white",
  },
  {
    id: "kakao",
    name: "Kakao",
    icon: "/socials/kakao.svg",
    className: "bg-[#FEE500] font-medium text-black",
  },
];

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<User>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: User) => {
    signIn("email", {
      email: data.email,
      callbackUrl,
    });
  };

  return (
    <CardBody className="flex flex-col gap-4">
      <CardHeader className="flex justify-center text-xl font-medium">
        Sign in with
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
      </form>
      <Divider />
      <p className="flex justify-center font-medium">OR</p>
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
    </CardBody>
  );
}
