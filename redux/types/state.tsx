import { filter } from "./filter";
import { Movie } from "./Movie";
import { User } from "./user";

export interface state {
  movies: Movie[];
  genres: string[];
  filter: filter;
  details: { show: boolean; movie: Movie };
  page: number;
  user: User;
}
