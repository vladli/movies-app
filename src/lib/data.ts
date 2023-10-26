export type TMenu = {
  name: string;
  url?: string;
  children?: {
    name: string;
    url: string;
  }[];
};
export const menu: TMenu[] = [
  {
    name: "Main",
    url: "/",
  },
  {
    name: "Trending",
    url: "/trending",
  },
  {
    name: "Discover",
    children: [
      {
        name: "Popular",
        url: "/popular",
      },
      {
        name: "Upcoming",
        url: "/upcoming",
      },
      {
        name: "Top Rated",
        url: "/top-rated",
      },
    ],
  },
  {
    name: "TV Series",
    url: "/tv",
  },
  {
    name: "People",
    url: "/people",
  },
];
