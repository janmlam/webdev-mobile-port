import { filter } from "../../redux/types/filter";
import { Movie } from "../../redux/types/Movie";
import Constants from "expo-constants";

/**
 * Henter filmene fra databasen.
 * @param addMovie sier om vi skal legge til flere filmer, eller erstatte filmene.
 * @param addMovies funkjson for å legge til filmer.
 * @param setMovies funksjon for å erstatte filmene.
 * @param filter et filter for filmene vi ønsker.
 * @param page  hvilken side i settet vi ønsker å laste inn (20 pr. side).
 */
function FetchMovies(
  addMovie: boolean,
  addMovies: {
    (movies: Movie[]): void;
  },
  setMovies: {
    (movies: Movie[]): void;
  },
  filter: filter,
  page: number
) {
  const { manifest } = Constants;
  const ipv4Adress = manifest.debuggerHost?.split(":")[0];
  fetch(
    "http://" +
      ipv4Adress +
      ":5000/api/movies?genre=" +
      filter.genre +
      "&title=" +
      filter.search +
      "&minrate=" +
      filter.score[0] +
      "&maxrate=" +
      filter.score[1] +
      "&sortby=" +
      filter.sort +
      "&order=" +
      filter.desc +
      "&minlen=" +
      filter.duration[0] +
      "&maxlen=" +
      filter.duration[1] +
      "&pagenr=" +
      page
  ).then((response) => {
    console.log("Fetching ...");
    console.log(page);
    if (response.ok) {
      response.json().then((data: Movie[]) => {
        addMovie ? addMovies(data) : setMovies(data);
      });
    } else {
      addMovie ? console.log("No more movies") : setMovies([]);
    }
  });
}

export default FetchMovies;
