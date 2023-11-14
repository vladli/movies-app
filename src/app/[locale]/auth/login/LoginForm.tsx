"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-2">
      {socials.map((social) => (
        <Button
          className={social.className}
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
          {t("Auth.Sign in with")} {social.name}
        </Button>
      ))}
    </div>
  );
}
