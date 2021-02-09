import React from "react";
import { Linking } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { filter } from "../../../redux/types/filter";

function ErrorScreen(props: { filter: filter }) {
  return (
    <View style={styles.errorScreen}>
      <Text style={styles.mainText}>
        Found no <Text style={styles.hightlight}>{props.filter.genre}</Text>{" "}
        movies with <Text style={styles.hightlight}>{props.filter.search}</Text>{" "}
        in the title. Most likely causes:
      </Text>
      <Text style={styles.errorReason}>
        1. We dont have the movie you are looking for.
      </Text>
      <Text style={styles.errorReason}>
        2. You were to picky in the filter panel.
      </Text>
      <Text style={styles.errorReason}>
        3. The server failed to deliver data.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorScreen: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "#eb7c7c",
    borderRadius: 10,
    padding: 10,
  },
  hightlight: { fontStyle: "italic", fontSize: 20, fontWeight: "bold" },
  mainText: { fontSize: 15 },
  errorReason: {
    fontWeight: "300",
    fontSize: 14,
    marginTop: 20,
    marginLeft: 10,
  },
});

export default ErrorScreen;
