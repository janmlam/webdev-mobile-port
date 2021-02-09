import React from "react";
import { ScrollView, View } from "react-native";
import GenraSelector from "./GenraSelector";
import RangeSlider from "./RangeSlider";
import SortingSelector from "./SortingSelector";

function FilterPanel(props: { show: boolean }) {
  return (
    <View
      style={{
        zIndex: props.show ? 1000 : 0,
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
    >
      <ScrollView
        style={{
          display: props.show ? "flex" : "none",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(227, 221, 166, 0.96)",
          opacity: 1,
          bottom: 0,
          paddingTop: 20,
        }}
      >
        <SortingSelector />
        <GenraSelector />
        <RangeSlider title={"Rating slider"} max={10} min={0} step={0.1} />
        <RangeSlider title={"Duration slider"} max={230} min={65} step={1} />
      </ScrollView>
    </View>
  );
}

export default FilterPanel;
