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
  User,
} from "@nextui-org/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function UserMenu() {
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
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">
              {session?.user?.email || session?.user?.name}
            </p>
          </DropdownItem>

          <DropdownItem
            as={Link}
            href="/profile/favorites"
            key="favorites"
            startContent={<AiFillHeart />}
          >
            My Favorites
          </DropdownItem>
          <DropdownItem
            key="settings"
            showDivider
            startContent={<MdSettings />}
          >
            My Settings
          </DropdownItem>

          <DropdownItem
            color="danger"
            key="logout"
            onPress={() => signOut()}
            startContent={<MdLogout />}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
