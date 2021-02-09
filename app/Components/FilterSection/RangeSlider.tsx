import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React from "react";
import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";
import { setScore, setDuration } from "../../../redux/actions";

function RangeSlider(props: {
  title: string;
  max: number;
  min: number;
  step: number;
}) {
  const dispatch = useDispatch();

  let [scoreRange, updateRange] = useState([props.min, props.max]);

  function updateScore(range: number[]) {
    updateRange(range);
  }
  function updateRatingState(range: number[]) {
    props.title === "Rating slider"
      ? dispatch(setScore(range))
      : dispatch(setDuration(range));
  }

  return (
    <View style={styles.sliderContent}>
      <Text style={styles.sliderTitle}>{props.title}</Text>
      <MultiSlider
        isMarkersSeparated={true}
        values={[props.min, props.max]}
        enabledTwo={true}
        onValuesChange={(values) => {
          updateScore(values);
        }}
        onValuesChangeFinish={(values) => {
          updateRatingState(values);
        }}
        min={props.min}
        max={props.max}
        step={props.step}
      />
      <View style={styles.rangeTextWrapper}>
        <Text style={styles.rangeTextLeft}>
          {props.title == "Duration slider"
            ? Math.floor(scoreRange[0] / 60) +
              " h " +
              (scoreRange[0] % 60) +
              " min"
            : scoreRange[0].toFixed(1)}
        </Text>
        <Text style={styles.rangeTextRight}>
          {props.title == "Duration slider"
            ? Math.floor(scoreRange[1] / 60) +
              " h " +
              (scoreRange[1] % 60) +
              " min"
            : scoreRange[1].toFixed(1)}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  sliderContent: {
    marginBottom: 50,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  sliderTitle: { fontSize: 20 },
  rangeTextWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: 280,
  },
  rangeTextLeft: {},
  rangeTextRight: {},
});

export default RangeSlider;
