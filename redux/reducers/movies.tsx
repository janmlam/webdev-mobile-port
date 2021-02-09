import { Movie } from "../types/Movie";

// Reducer for lagring av filmer
const moviesReducer = (
  movies = [],
  action: { type: string; payload: Movie[] }
) => {
  switch (action.type) {
    case "setMovies":
      return action.payload;
    default:
      return movies;
  }
};
export default moviesReducer;
