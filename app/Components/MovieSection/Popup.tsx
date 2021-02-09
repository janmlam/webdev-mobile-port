import React from "react";
import { ScrollView } from "react-native";
import { View, Text, Image, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { showPopup } from "../../../redux/actions";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { state } from "../../../redux/types/state";

function Popup() {
  const dispatch = useDispatch();
  const details = useSelector((state: state) => state.details);

  return (
    <ScrollView style={styles.popup}>
      <View style={styles.movieInfoContainer}>
        <Button
          style={{ maxWidth: 100 }}
          icon={
            <Icon
              style={{ marginRight: 10 }}
              name="arrow-left"
              size={20}
              color="white"
            />
          }
          title={"back"}
          onPress={() => dispatch(showPopup(false))}
        />

        <Image
          source={{ uri: details.movie.posterurl }}
          resizeMode="cover"
          resizeMethod="resize"
          style={styles.moviePoster}
        />
        <View style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Text style={styles.movieTitle}>{details.movie.title}</Text>
          <Text style={styles.movieDetails}>
            <Text style={styles.highlight}>Genre: </Text>
            {details.movie.genres}
          </Text>
          <Text style={styles.movieDetails}>
            <Text style={styles.highlight}>Runningtime: </Text>{" "}
            {Math.floor(details.movie.duration / 60) +
              "t " +
              (details.movie.duration % 60) +
              "m"}
          </Text>
          <Text style={styles.movieDetails}>
            <Text style={styles.highlight}>Rating: </Text>
            {details.movie.imdbRating}
          </Text>
          <Text style={styles.movieDetails}>
            <Text style={styles.highlight}>Year: </Text>
            {details.movie.year}
          </Text>
        </View>
        <Text style={styles.movieStory}>{details.movie.storyline}</Text>
      </View>
    </ScrollView>
  );
}

//--------------- Styling -----------------///
const styles = StyleSheet.create({
  popup: {
    width: "100%",
    height: "100%",
    backgroundColor: "#383838",
    opacity: 1,
    position: "absolute",
    bottom: 0,
    padding: 10,
  },

  movieInfoContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  movieTitle: { color: "white", padding: 10, fontSize: 20, fontWeight: "bold" },
  movieDetails: { color: "white", padding: 10 },
  highlight: { fontWeight: "800" },
  moviePoster: {
    height: 400,
    width: 275,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignSelf: "center",
    margin: 10,
  },
  movieStory: {
    color: "white",
    fontSize: 15,
    padding: 10,
    marginBottom: 30,
  },
});
export default Popup;
