import { DefaultSession, DefaultUser } from "next-auth";

import { TMovieData } from "@/types/types";

export enum Role {
  user = "user",
  admin = "admin",
}
interface IUser extends DefaultUser {
  id: string;
  role?: Role;
  provider?: string;
  favoriteMovies?: TMovieData[];
}
declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
