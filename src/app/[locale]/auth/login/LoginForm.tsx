"use client";
import {Button} from "@heroui/react";
import {signIn} from "next-auth/react";
import {useTranslations} from "next-intl";
import Image from "next/image";

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
    {
        id: "yandex",
        name: "Yandex",
        icon: "/socials/yandex.svg",
        className: "bg-[#000] font-medium text-white",
    },
    {
        id: "vk",
        name: "VKontakte",
        icon: "/socials/vk.svg",
        className: "bg-[#4C75A3] font-medium text-white",
    },
];

export default function LoginForm() {
    const t = useTranslations();
    return (
        <div className="flex flex-col gap-2">
            {socials.map((social) => (
                <Button
                    key={social.id}
                    className={social.className}
                    startContent={
                        <Image
                            alt=""
                            height={20}
                            src={social.icon}
                            width={20}
                        />
                    }
                    onClick={() => signIn(social.id)}
                >
                    {t("Auth.Sign in with")} {social.name}
                </Button>
            ))}
        </div>
    );
}
