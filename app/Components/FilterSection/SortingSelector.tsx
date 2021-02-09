import React from "react";
import { View, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useDispatch } from "react-redux";
import { setSort } from "../../../redux/actions";
import StyleSelectors from "../../Styles/StyleSelectors";

function SortingSelector() {
  const dispatch = useDispatch();

  function onSearchChange(data: string) {
    dispatch(setSort(data));
  }

  return (
    <View style={StyleSelectors.sliderContent}>
      <Text style={StyleSelectors.sliderTitle}>Sort by:</Text>
      <RNPickerSelect
        style={StyleSelectors}
        onValueChange={(value) =>
          onSearchChange(value === null ? "title" : value)
        }
        items={[
          { label: "Title", value: "title" },
          { label: "Duration", value: "duration" },
          { label: "Year", value: "year" },
          { label: "Rating", value: "imdbRating" },
        ]}
        useNativeAndroidPickerStyle={false}
      />
    </View>
  );
}

export default SortingSelector;
