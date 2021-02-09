import React from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { Icon, Button } from "react-native-elements";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import ErrorScreen from "./ErrorScreen";
import Popup from "./Popup";
import { state } from "../../../redux/types/state";
import { Movie } from "../../../redux/types/Movie";

function MainContent(props: { refresh: (add: boolean) => void }) {
  const detalis = useSelector((state: state) => state.details);
  const movies = useSelector((state: state) => state.movies);

  function getMoreMovies() {
    props.refresh(true);
  }
  const wait = (timeout: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  return useSelector((state: state) => {
    return (
      <View style={styles.mainContent}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => props.refresh(false)}
            />
          }
          style={styles.movieGrid}
        >
          <View style={styles.movies}>
            {movies.length > 0 ? (
              movies.map((movie: Movie, key: number) => {
                return <MovieCard movie={movie} key={movie._id} />;
              })
            ) : (
              <ErrorScreen filter={state.filter} />
            )}
          </View>
          <Button
            style={styles.loadButton}
            icon={
              <Icon
                type="font-awesome"
                style={styles.icon}
                name="angle-double-down"
                size={20}
                color="white"
              />
            }
            title={"Load more"}
            onPress={getMoreMovies}
          />
        </ScrollView>
        {detalis.show ? <Popup /> : null}
      </View>
    );
  });
}

//--------- Styling --------------//
const styles = StyleSheet.create({
  movies: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    padding: 10,
  },
  movieGrid: {
    backgroundColor: "#E5DFCA",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  loadButton: {
    margin: 10,
    width: 175,
    alignSelf: "center",
  },
  mainContent: {
    height: "100%",
  },
  icon: { marginRight: 10 },
});
export default MainContent;
