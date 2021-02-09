import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, Image, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { setPopup, showPopup } from "../../../redux/actions";
import { Movie } from "../../../redux/types/Movie";

function MovieCard(props: { movie: Movie }) {
  // Nødvendig for redux
  const dispatch = useDispatch();

  // Åpner opp Popup.
  function handleClick() {
    dispatch(setPopup(props.movie));
    dispatch(showPopup(true));
    console.log("Fetch popup");
  }

  return (
    <TouchableOpacity onPress={() => handleClick()}>
      <View style={styles.movieCard}>
        <Image
          source={{ uri: props.movie.posterurl }}
          resizeMode="cover"
          resizeMethod="resize"
          style={styles.moviePoster}
        />
        <Text numberOfLines={1} style={styles.movieTitle}>
          {props.movie.title}
        </Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={styles.movieYear}>{props.movie.year}</Text>
          <Text style={styles.movieDuration}>
            {" "}
            {Math.floor(props.movie.duration / 60) +
              "t" +
              (props.movie.duration % 60) +
              "m"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

//----------- Styling ------------ //
const styles = StyleSheet.create({
  movieCard: {
    width: 150,
    height: 275, //225 for poster + 50 for movie info
    backgroundColor: "#AAA595",
    margin: 10,
    flexDirection: "column",
    borderRadius: 10,
    overflow: "visible",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  moviePoster: {
    height: 225,
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  movieTitle: {
    color: "white",
    height: 25,
    width: "100%",
    fontSize: 11,
    paddingLeft: 10,
    paddingTop: 6,
    fontWeight: "bold",
  },
  movieDuration: {
    color: "white",
    height: 25,
    fontSize: 12,
    paddingLeft: 10,
    position: "absolute",
    right: 0,
    paddingRight: 10,
  },
  movieYear: {
    color: "white",
    height: 25,
    width: "100%",
    fontSize: 13,
    paddingLeft: 10,
  },
});
export default MovieCard;
