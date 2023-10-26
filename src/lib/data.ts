export const menu = [
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
    url: "/trending",
    children: [
      {
        name: "Popular",
        url: "/trending",
      },
      {
        name: "Upcoming",
        url: "/trending",
      },
      {
        name: "Top Rated",
        url: "/trending",
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
] as const;
