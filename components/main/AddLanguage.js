import React, { useState } from "react";
import {
  View,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
require("firebase/firestore");
require("firebase/firebase-storage");
import "firebase/firestore";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationEvents } from "react-navigation";
import { Audio } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

function AddLanguage({ currentUser, route, navigation }) {
  const [language, setLanguage] = useState("");
  const [convertedLanguage, setConvertedLanguage] = useState("");
  const [history, setHistory] = useState("");
  const [note, setNote] = useState("");

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const filteredLanguage = Capitalize(language);
  const filteredNote = Capitalize(note);

  const submit = async () => {
    saveUserData();
  };

  const saveUserData = () => {
    firebase
      .firestore()
      .collection("languages")
      .doc(filteredLanguage)
      .set({
        language: filteredLanguage,
        description: filteredNote,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        alert("Language Successfully Added.");
        navigation.navigate("Language");
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.bodycontainer}>
        <View style={{ marginVertical: 15 }}>
          <View>
            <Text style={[styles.text, { color: "#000000" }]}>
              Add a New Language
            </Text>
          </View>
          <Text>
            Help the application grow and expand its reach by adding a new
            language that is in need of preservation.
          </Text>
        </View>

        <View style={{ marginVertical: 5 }}>
          <Text style={[styles.text, { fontSize: 16 }]}>Language</Text>
          <TextInput
            style={styles.input}
            multiline={true}
            autoCapitalize="none"
            onChangeText={(language) => setLanguage(language)}
          />
        </View>
        {/* <View style={styles.bodycontainer}>
          <View style={{ marginVertical: 15 }}>
            <View>
              <Text style={[styles.text, { color: "#000000" }]}>
                Brief History
              </Text>
            </View>
            <Text>
              Brief history of the language and the culture of the tribes that
              are using the application.
            </Text>
          </View>
        </View> */}
        {/* <View style={{ marginVertical: 5 }}>
            <Text style={[styles.text, { fontSize: 16 }]}></Text>
            <TextInput
              multiline={true}
              style={[
                styles.addButton,
                { height: 180 },
                { paddingHorizontal: 10, flexDirection: "row" },
              ]}
              onChangeText={(history) => setHistory(history)}
            ></TextInput>
          </View>
        </View> */}
        <View>
          <Text style={[styles.text, { fontSize: 16 }]}>
            About the Language
          </Text>
          <Text>Brief introduction/description about the language.</Text>
          <TextInput
            multiline={true}
            style={[
              styles.addButton,
              { height: 180 },
              { paddingHorizontal: 10, flexDirection: "row" },
            ]}
            onChangeText={(note) => setNote(note)}
          ></TextInput>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
            marginVertical: 25,
          }}
        >
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#bfa42a" }]}
            onPress={() => submit()}
          >
            <Text style={[styles.text, { fontSize: 16, color: "white" }]}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(AddLanguage);
const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    top: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  input: {
    letterSpacing: 0.25,
    height: 50,
    width: "95%",
    paddingLeft: 12,
    paddingTop: 1,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#707070",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 0.5,
  },
  bodycontainer: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  addButton: {
    borderColor: "#70707033",
    borderWidth: 1.5,
    marginVertical: 10,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flex: 1,
    borderRadius: 5,
    alignItems: "center",
    paddingVertical: 15,
  },
});
