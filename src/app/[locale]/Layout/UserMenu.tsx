"use client";
import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { MdLogout, MdSettings } from "react-icons/md";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function UserMenu() {
  const t = useTranslations();
  const { data: session } = useSession();
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            as="button"
            className="transition-transform"
            isBordered
            src={session?.user?.image ? session?.user?.image : ""}
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          disabledKeys={["profile", "settings"]}
          variant="flat"
        >
          <DropdownItem
            className="h-14 gap-2"
            key="profile"
          >
            <p className="font-semibold">
              {t("#ROOT.Header.Profile.signedInAs")}
            </p>
            <p className="font-semibold">
              {session?.user?.name || session?.user?.email}
            </p>
          </DropdownItem>

          <DropdownItem
            as={Link}
            href="/profile/favorites"
            key="favorites"
            startContent={<AiFillHeart />}
          >
            {t("#ROOT.Header.Profile.MyFavorites")}
          </DropdownItem>
          <DropdownItem
            key="settings"
            showDivider
            startContent={<MdSettings />}
          >
            {t("#ROOT.Header.Profile.MySettings")}
          </DropdownItem>

          <DropdownItem
            color="danger"
            key="logout"
            onPress={() => signOut()}
            startContent={<MdLogout />}
          >
            {t("#ROOT.Header.Profile.LogOut")}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
