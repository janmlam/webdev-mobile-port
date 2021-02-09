import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Platform, StyleSheet } from "react-native";
import { Icon, Button } from "react-native-elements";
import MainContent from "./MovieSection/MainContent";
import Header from "./Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { state } from "../../redux/types/state";
import {
  setDesc,
  setGenre,
  setGenresState,
  setMovieState,
  setSearch,
  setSort,
  setPage,
} from "../../redux/actions";
import FilterPanel from "./FilterSection/FilterPanel";
import { Movie } from "../../redux/types/Movie";
import FetchMovies from "../functions/FetchMovies";
import GenreUpdate from "../functions/GenreUpdate";

function MovieDB() {
  const dispatch = useDispatch();
  const currentMovies = useSelector((state: state) => state.movies);
  const page = useSelector((state: state) => state.page);
  const filter = useSelector((state: state) => state.filter);
  let [showMenu, toggleShowMenu] = useState(false);
  let [isDescending, toggleDescending] = useState(false);

  function toggleMenu() {
    if (showMenu) {
      dispatch(setPage(1));
      refresh(false);
    }
    toggleShowMenu(!showMenu);
  }

  function setMovies(movies: Movie[]) {
    dispatch(setMovieState([]));
    dispatch(setMovieState(movies));
  }

  function addMovies(movies: Movie[]) {
    dispatch(
      setMovieState(
        movies.length > 0 ? currentMovies.concat(movies) : currentMovies
      )
    );
  }

  function setGenres(genres: string[]) {
    dispatch(setGenresState(genres));
  }

  function setDescending() {
    toggleDescending(!isDescending);
    dispatch(setDesc(!filter.desc));
    refresh(false);
  }

  function setFilter(filter: {
    duration: number[];
    score: number[];
    search: string;
    year: number[];
    myMovies: boolean;
    genre: string;
    sort: string;
    desc: boolean;
  }) {
    dispatch(setDesc(filter.desc));
    dispatch(setSearch(filter.search));
    dispatch(setGenre(filter.genre));
    dispatch(setSort(filter.sort));
  }

  // Setter et default filter og henter filmer en gang på starten
  useEffect(() => {
    setFilter({
      desc: true,
      sort: "title",
      search: "",
      genre: "",
      score: [0, 10],
      year: [1920, 2020],
      duration: [65, 320],
      myMovies: false,
    });
    GenreUpdate(setGenres);
    FetchMovies(false, addMovies, setMovies, filter, page);
  }, []);

  /**
   * Oppdaterer listen med filmer i redux.
   * @param add sier om filmene skal legges til i den allerede eksistrende arrayen eller erstate den.
   */
  function refresh(add: boolean) {
    if (add) {
      dispatch(setPage(page + 1));
    }
    FetchMovies(add, addMovies, setMovies, filter, add ? page + 1 : 1);
  }

  return (
    <SafeAreaView style={styles.movieDB}>
      <Header refresh={refresh} />
      <View style={styles.buttonPanel}>
        <Button
          icon={
            <Icon
              type="font-awesome"
              style={styles.filterIcon}
              name="filter"
              size={20}
              color="white"
            />
          }
          title={showMenu ? "Apply filter" : "Add Filter"}
          onPress={() => toggleMenu()}
        />
        <Button
          title={"Order"}
          onPress={setDescending}
          icon={
            <Icon
              type="font-awesome"
              style={styles.filterIcon}
              name={
                filter.sort == "title"
                  ? isDescending
                    ? "sort-alpha-desc"
                    : "sort-alpha-asc"
                  : isDescending
                  ? "sort-amount-asc"
                  : "sort-amount-desc"
              }
              size={20}
              color="white"
            />
          }
        />
      </View>
      <View style={styles.movieSection}>
        <FilterPanel show={showMenu} />
        <MainContent refresh={refresh} />
      </View>
    </SafeAreaView>
  );
}

//--------------STYLING -----------------//
const styles = StyleSheet.create({
  movieDB: {
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  buttonPanel: {
    display: "flex",
    flexDirection: "row",
    margin: 5,
    marginTop: 0,
    justifyContent: "space-evenly",
  },
  movieSection: { flex: 1 },
  filterbutton: {},
  filterIcon: { marginRight: 10 },
});

export default MovieDB;
