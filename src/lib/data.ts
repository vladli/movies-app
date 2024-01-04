import { Dispatch, SetStateAction } from "react";

export type TMenu = {
  setIsMenuOpen?: Dispatch<SetStateAction<boolean>>;
  name: any;
  url: string;
  submenu: {
    name: string;
    url: string;
  }[];
};
export const menu: TMenu[] = [
  {
    name: "MainPage.title",
    url: "/",
    submenu: [],
  },
  {
    name: "Trending.title",
    url: "/trending",
    submenu: [],
  },
  {
    name: "Discover.title",
    url: "/discover",
    submenu: [
      {
        name: "Discover.Popular.title",
        url: "/discover/popular",
      },
      {
        name: "Discover.Upcoming.title",
        url: "/discover/upcoming",
      },
      {
        name: "Discover.Top Rated.title",
        url: "/discover/top_rated",
      },
    ],
  },
  {
    name: "TV Series.title",
    url: "/tv",
    submenu: [],
  },
  {
    name: "Actors.title",
    url: "/actors",
    submenu: [],
  },
];
