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
        url: "/discover/popular",
      },
      {
        name: "Upcoming",
        url: "/discover/upcoming",
      },
      {
        name: "Top Rated",
        url: "/discover/top_rated",
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
