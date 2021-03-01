import React from "react";
import { StyleSheet, Text } from "react-native";

const BodyText = (props) => {
  const { children, style } = props;
  return <Text style={{...styles.body, ...style}}>{children}</Text>;
};

export default BodyText;

const styles = StyleSheet.create({
  body: {
    fontFamily: "open-sans",
  },
});
