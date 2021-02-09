// Setter sjangrene i state
function GenreUpdate(setGenres: {
  (genres: string[]): void;
  (arg0: string[]): void;
}) {
  let genres: string[] = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Musical",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Sport",
    "Thriller",
    "War",
    "Western",
  ];
  setGenres(genres);
}
export default GenreUpdate;
