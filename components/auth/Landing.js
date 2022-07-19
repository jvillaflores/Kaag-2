import React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

var logo = require("../../assets/Alima.png");

// Landing Page of the mobile application
export default function Landing({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.image} />
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.textSubHead}>
          Alima is data collection app that lets the user contribute to a
          specific language and connect with the community. It also aims to help
          preserve endangered languages.
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#215A88" }]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.text}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { borderWidth: 2, borderColor: "#215A88" }]}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={[styles.text, { color: "#215A88" }]}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    borderRadius: 10,
    padding: 15,
    margin: 5,
    width: "80%",
  },

  text: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
  },
  image: {
    alignSelf: "center",
    justifyContent: "center",
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  logoContainer: {
    position: "relative",
    alignSelf: "center",
    top: -30,
  },
  header: {
    alignSelf: "center",
    //bottom: -45,
    //top:50,
  },

  textHead: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
    alignSelf: "center",
    margin: 10,
  },
  subHeader: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },

  textSubHead: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
    margin: 15,
    bottom: 10,
  },
});
