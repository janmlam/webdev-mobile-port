// Reducer for å endre sjangerlisten
const genresReducer = (
  genres = [],
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case "setGenres":
      return action.payload;
    default:
      return genres;
  }
};
export default genresReducer;
