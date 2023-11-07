export type TMenu = {
  toggle?: () => void;
  name: any;
  url?: string;
  children?: {
    name: string;
    url: string;
  }[];
};
export const menu: TMenu[] = [
  {
    name: "Main page",
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
    name: "Actors",
    url: "/actors",
  },
];
