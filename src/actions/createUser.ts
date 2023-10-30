"use server";

import argon2 from "argon2";

import { prisma } from "@/lib/prisma";
type User = {
  email: string;
  password: string;
  confirmPassword: string;
};

export async function createUser(data: User) {
  const { email, password, confirmPassword } = data;
  if (!email || !password || !confirmPassword)
    return {
      error: "Please fill all return fields.",
    };
  if (password !== confirmPassword)
    return { error: "Passwords do not match, please try again." };
  const duplicate = await prisma.user.findUnique({ where: { email: email } });
  if (duplicate)
    return {
      error: "User with this email already exists, try to sign in instead.",
    };
  const hash = await argon2.hash(password);
  try {
    await prisma.user.create({
      data: {
        email: email,
        provider: "email",
        password: hash,
      },
    });
  } catch (error) {
    return { error };
  }
  return { error: null };
}
