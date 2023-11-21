"use client";

import { Avatar } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function ProfileInfo() {
  const t = useTranslations();
  const { data: session } = useSession();
  return (
    <div className="flex flex-col items-center gap-1 text-lg">
      <Avatar
        className="h-32 w-32 place-self-center"
        isBordered
        radius="md"
        src={session?.user?.image || ""}
      />
      <p>{t("Profile.MyProfile.userName", { name: session?.user?.name })}</p>
      <p>{t("Profile.MyProfile.email", { email: session?.user?.email })}</p>
    </div>
  );
}
