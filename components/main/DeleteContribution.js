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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationEvents } from "react-navigation";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { updateDictionary } from "../../redux/actions";
import Checkbox from "expo-checkbox";

function DeleteContribution({ route, navigation, currentUser }) {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const { data } = route?.params ?? {};
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  console.log(data?.language);
  console.log(data?.id);
  const Reject = () => {
    setLoading(true);
    rejectDictionaryAll();
  };

  const deleteContribution = () => {
    firebase
      .firestore()
      .collection("languages")
      .doc(data?.language)
      .collection("dictionary")
      .doc(`${data?.id}`)
      .delete()
      .then((result) => {
        alert("Contribution Permanently Deleted!");
        navigation.navigate("MyContribution");
        setLoading(false);
      })
      .catch((err) => console.log(err, "-=error"));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.center}>
        <View style={styles.paddingLeft}>
          <Text style={styles.title_text}>Delete {data?.word} </Text>
          <Text style={styles.guidelines}>
            Are you sure that you want to delete your contribution {data?.word}?
            Deleting this will permanently remove it from the database. If not
            press the back button to cancel the deletion.
          </Text>
          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
              color={toggleCheckBox ? "#215a88" : undefined}
            />
            <Text style={styles.description}>
              {" "}
              I acknowlede the risks of deleting this data.
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: toggleCheckBox ? "#8E2835" : "#d7979f" },
        ]}
        disabled={!toggleCheckBox}
        onPress={() => [deleteContribution()]}
      >
        <Text style={styles.subtitle}> Delete </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(DeleteContribution);
const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    // /justifyContent: "center",
    top: 1,
    //left: 40,
  },
  subtitle: {
    alignSelf: "center",
    fontSize: 18,

    letterSpacing: 0.25,
    color: "white",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  button: {
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 1,
    width: "90%",
    backgroundColor: "#215A88",
    //top: 130,
    marginTop: 20,
    marginBottom: 80,
  },
  audioButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    borderWidth: 1,
    borderRadius: 10,
    height: 70,
    borderColor: "#707070",
    paddingTop: 20,
    marginTop: 10,
  },
  guidelines: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#707070",
    textAlign: "justify",
  },
  addAudio: {
    flex: 1,
  },

  bottom: {
    marginBottom: 20,
  },

  center: {
    justifyContent: "center",
    alignContent: "center",
  },

  paddingLeft: {
    alignContent: "flex-start",
    // padding:15,
    // paddingRight:5,
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 10,
    justifyContent: "center",
  },

  title_text: {
    //alignContent:"flex-start",
    fontWeight: "bold",
    fontSize: 17,
  },
  text_input: {
    alignSelf: "flex-start",
    paddingLeft: 12,
    paddingTop: 10,
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
  tags_input: {
    letterSpacing: 0.25,
    height: 80,
    width: "95%",
    paddingLeft: 12,
    paddingTop: 1,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#707070",
  },
  description_input: {
    letterSpacing: 0.25,
    height: 100,
    width: "95%",
    paddingLeft: 12,
    paddingTop: 1,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#707070",
  },
});
