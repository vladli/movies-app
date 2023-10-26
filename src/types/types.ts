export type MediaType = "movie" | "tv";

export type TResponse<T> = {
  page: number;
  results: T;
  total_results: number;
  total_pages: number;
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
