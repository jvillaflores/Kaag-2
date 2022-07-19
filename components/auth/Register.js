import React, { Component, useState } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { TextInput } from "react-native-paper";
import Svg, { Path, G, Rect, Polygon, Title } from "react-native-svg";
import PassMeter from "react-native-passmeter";
import firebase from "firebase/app";
import "firebase/firestore";
require("firebase/auth");
import ValidationComponent from "react-native-form-validator";

const MAX_LEN = 15,
  MIN_LEN = 6,
  PASS_LABELS = ["Too Short", "Weak", "Normal", "Strong", "Secure"];

export default class Register extends ValidationComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: "Anonymous",
      type: "",
      userImage: "",
      secureTextEntry: true,
    };
    this.onSignUp = this.onSignUp.bind(this);
  }

  //Function for signing up
  onSignUp() {
    const { email, password, name, type } = this.state;
    // Validation
    this.validate({
      email: { email: true },
      name: { required: true },
      password: { required: true },
    });

    // Firebase function for sign up
    //User type is default as 0. (0 = basic user)
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
            type: 0,
            status: "0",
            userImage: " ",
          });
        console.log(result);
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    const { navigation } = this.props;
    const { secureTextEntry } = this.state;
    const { password } = this.state;
    const { name } = this.state;

    return (
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.welcome}>Welcome to ALIMA,</Text>
          <Text style={styles.subtitle}>Create account to get started!</Text>
        </View>
        <View style={styles.loginGroup}>
          <View style={styles.space}>
            {this.isFieldInError("name") &&
              this.getErrorsInField("name").map((errorMessage) => (
                <Text style={{ color: "red" }}>
                  Please enter your Full Name
                </Text>
              ))}
            <TextInput
              label="Name"
              activeUnderlineColor="#215a88"
              placeholder={name}
              onChangeText={(name) => this.setState({ name })}
            />
          </View>

          <View style={styles.space}>
            <TextInput
              keyboardType="email-address"
              label="Email"
              activeUnderlineColor="#215a88"
              onChangeText={(email) => this.setState({ email })}
            />
          </View>

          <View style={styles.space}>
            {this.isFieldInError("password") &&
              this.getErrorsInField("password").map((errorMessage) => (
                <Text style={{ color: "red" }}>
                  Please enter your your password
                </Text>
              ))}
            {secureTextEntry == true ? (
              <TextInput
                label="Password"
                secureTextEntry={secureTextEntry}
                iconSize={25}
                iconColor={"#222222"}
                onChangeText={(password) => this.setState({ password })}
                value={password}
                activeUnderlineColor="#215a88"
                right={
                  <TextInput.Icon
                    name="eye"
                    onPress={() => {
                      this.setState({ secureTextEntry: false });
                      return false;
                    }}
                  />
                }
              />
            ) : null}
            {secureTextEntry == false ? (
              <TextInput
                label="Password"
                secureTextEntry={secureTextEntry}
                iconSize={25}
                iconColor={"#222222"}
                onChangeText={(password) => this.setState({ password })}
                value={password}
                activeUnderlineColor="#215a88"
                right={
                  <TextInput.Icon
                    name="eye-off"
                    onPress={() => {
                      this.setState({ secureTextEntry: true });
                      return true;
                    }}
                  />
                }
              />
            ) : null}
            <PassMeter
              showLabels
              password={password}
              maxLength={MAX_LEN}
              minLength={MIN_LEN}
              labels={PASS_LABELS}
            />
          </View>
        </View>
        <View style={{ paddingTop: 20 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onSignUp()}
          >
            <Text style={styles.text}>Sign Up</Text>
          </TouchableOpacity>

          {/* <Pressable style={styles.buttonGoogle} onPress={() => this.onSignUp()}>
                  <Svg id="search" xmlns="http://www.w3.org/2000/svg" width="22.845" height="22.845" viewBox="0 0 22.845 22.845">
                    <Path id="Path_382" data-name="Path 382" d="M5.063,145.9l-.8,2.969-2.906.061a11.442,11.442,0,0,1-.084-10.666h0l2.588.474L5,141.314a6.817,6.817,0,0,0,.064,4.59Z" transform="translate(0 -132.099)" fill="#fbbb00"/>
                    <Path id="Path_383" data-name="Path 383" d="M272.6,208.176a11.418,11.418,0,0,1-4.072,11.041h0l-3.259-.166-.461-2.879a6.808,6.808,0,0,0,2.929-3.476h-6.108v-4.519H272.6Z" transform="translate(-249.954 -198.887)" fill="#518ef8"/>
                    <Path id="Path_384" data-name="Path 384" d="M47.72,315.933h0a11.426,11.426,0,0,1-17.212-3.495l3.7-3.03A6.793,6.793,0,0,0,44,312.887Z" transform="translate(-29.148 -295.604)" fill="#28b446"/>
                    <Path id="Path_385" data-name="Path 385" d="M46.06,2.63l-3.7,3.029A6.792,6.792,0,0,0,32.346,9.216L28.625,6.169h0A11.425,11.425,0,0,1,46.06,2.63Z" transform="translate(-27.347)" fill="#f14336"/>
                  </Svg>
            <Text style={styles.textGoogle}> 
                
                    Connect with Google </Text>
         </Pressable> */}
        </View>
        <View style={{ alignItems: "center", paddingVertical: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text>
              I'm already a member.{" "}
              <Text style={styles.textSignUp}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

// export function Landing({ navigation }) {
//   return (

//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignContent: "center",
  },
  space: {
    paddingVertical: 5,
  },
  banner: {
    //flex: 1,
    alignContent: "center",
    justifyContent: "center",
    top: 70,
    left: 40,
  },
  bottom: {
    bottom: 20,
    marginBottom: 45,
  },
  loginGroup: {
    paddingTop: 70,
  },
  miniGroup: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    top: 200,
    left: 240,
  },

  welcome: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitle: {
    // flex: 1,
    // left: 20,
    fontSize: 22,
    fontWeight: "bold",
    color: "grey",
  },
  button: {
    alignSelf: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 1,
    width: "100%",
    backgroundColor: "#215a88",
  },
  buttonGoogle: {
    alignSelf: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 1,
    width: "80%",
    backgroundColor: "#dadada",
    top: 165,
  },
  text: {
    alignSelf: "center",
    fontSize: 18,

    letterSpacing: 0.25,
    color: "white",
  },
  logo: {
    width: 16,
    height: 16,
    right: 10,
  },
  textGoogle: {
    alignSelf: "center",
    paddingLeft: 40,
    paddingTop: 15,
    fontSize: 18,

    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
    position: "absolute",
  },
  textGrey: {
    fontSize: 15,
    color: "grey",
    //fontWeight: "bold",
    //left: 50,
  },
  textMini: {
    fontSize: 12,
    color: "gray",
    fontWeight: "bold",
    left: 200,
  },
  textSignUp: {
    fontSize: 14,
    color: "#91B2EB",
    fontWeight: "bold",
  },
  input: {
    height: 45,
    width: "100%",
    marginTop: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    paddingLeft: 10,
  },
});
