import { Component } from "react";
import { View, ImageBackground, Image, StyleSheet } from "react-native";

var bg = require("./assets/Splash_Screen.png");

export default function Splash({ navigation }) {
  return (
    <ImageBackground style={styles.background} source={bg}></ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
});
