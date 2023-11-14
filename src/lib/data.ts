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
    name: "MainPage.title",
    url: "/",
  },
  {
    name: "Trending.title",
    url: "/trending",
  },
  {
    name: "Discover.title",
    children: [
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
  },
  {
    name: "Actors.title",
    url: "/actors",
  },
];
