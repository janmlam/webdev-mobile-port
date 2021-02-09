import React from "react";
import { Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useDispatch, useSelector } from "react-redux";
import { setGenre } from "../../../redux/actions";
import { state } from "../../../redux/types/state";
import StyleSelectors from "../../Styles/StyleSelectors";

function GenraSelector() {
  const dispatch = useDispatch();

  const genres = useSelector((state: state) => state.genres);

  const genreOptions = genres.map((genre: string, index: number) => {
    return { label: genre, value: genre, index: index };
  });

  function onSearchChange(data: string) {
    dispatch(setGenre(data));
  }

  return (
    <View style={StyleSelectors.sliderContent}>
      <Text style={StyleSelectors.sliderTitle}>Genre:</Text>
      <RNPickerSelect
        style={StyleSelectors}
        onValueChange={(value) => onSearchChange(value === null ? "" : value)}
        items={genreOptions}
        useNativeAndroidPickerStyle={false}
      />
    </View>
  );
}

export default GenraSelector;
