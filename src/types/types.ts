export type MediaType = "movie" | "tv";

export type TResponse<T> = {
  page: number;
  results: T;
  total_results: number;
  total_pages: number;
};
export type TResponseSeasons<T> = {
  _id: string;
  air_date: string;
  episodes: T;
};
export type TListType = "upcoming" | "top_rated" | "popular";
export type TCategory = "movie" | "tv";
export type TSortType =
  | "popularity.desc"
  | "popularity.asc"
  | "release_date.desc"
  | "release_date.asc"
  | "vote_count.desc"
  | "vote_count.asc"
  | "original_title.asc"
  | "original_title.desc";

export type TSearchResult = TMovieData & TCastMember;

export type TMovieData = {
  adult?: boolean;
  name?: string;
  id: number;
  poster_path: string;
  original_name: string;
  original_title: string;
  original_language: string;
  release_date: string;
  first_air_date: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  title: string;
  homepage: string;
  genres: TGenre[];
  overview: string;
  popularity: number;
  budget: number;
  genre_ids: GenreIds;
  imdb_id: string | null;
  revenue: number;
  runtime: number | null;
  status: string;
  tagline: string | null;
  media_type?: MediaType;
  video?: boolean;
  videos: {
    id: number;
    results: TVideo[];
  };
  similar?: TResponse<TMovieData[]>;
  seasons?: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
  }[];
};

export type TSeries = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  runtime: number;
  still_path: string;
  season_number: number;
  vote_average: number;
};

export type TCastMember = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export type TActor = {
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  homepage: string | null;
  imdb_id: string;
  place_of_birth: string;
} & TCastMember;

export interface TGenre {
  id: number;
  name: string;
}
export type GenreIds = Array<number>;

export type TVideo = {
  name: string;
  key: string;
  site: string;
  size: 360 | 480 | 720 | 1080;
  type:
    | "Trailer"
    | "Teaser"
    | "Clip"
    | "Featurette"
    | "Behind the Scenes"
    | "Bloopers";

  id: string;
};

export type TReview = {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number | null;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
};
