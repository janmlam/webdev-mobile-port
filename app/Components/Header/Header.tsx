import React, { useRef, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { SearchBar } from "react-native-elements";
import { useDispatch } from "react-redux";
import { setPage, setSearch } from "../../../redux/actions";

function Header(props: { refresh: (arg0: boolean) => void }) {
  const dispatch = useDispatch();
  let timeoutRef = useRef(setTimeout(() => {}, 0));
  let [search, updateSearch] = useState("");

  // Når input endres tømmer vi den aktive timeouten og starter på nytt. Når der har gått 300ms, bytt ut search filter i state og refresh
  function onChange(data: string) {
    updateSearch(data);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      dispatch(setSearch(data));
      dispatch(setPage(1));
      props.refresh(false);
    }, 800);
  }

  return (
    <View style={styles.header}>
      <SearchBar
        platform={Platform.OS === "android" ? "android" : "ios"}
        placeholder="Type Here..."
        onChangeText={(search) => onChange(search)}
        value={search}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
  },
  searchInput: {
    margin: 10,
    height: 40,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 20,
  },
});

export default Header;
