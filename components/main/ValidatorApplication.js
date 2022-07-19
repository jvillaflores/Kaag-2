import React, { useState, useEffect } from "react";
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
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
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

function ValidatorApplication({ route, navigation }) {
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(null);
  const [note, setNote] = useState("");
  const [datalist, setDatalist] = useState([]);
  const [isChecked, setChecked] = useState(false);
  const [userLanguage, setuserLanguage] = useState("");
  const [secondLanguage, setsecondLanguage] = useState("");
  const [thirdLanguage, setthirdLanguage] = useState("");
  const { language } = route?.params ?? {};

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      firebase
        .firestore()
        .collection("languages")
        .get()
        .then((snapshot) => {
          let masterDataSource = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });

          setDatalist(masterDataSource);
        });
    });

    return unsubscribe;
  }, [navigation]);

  console.log(datalist);
  const chooseFile = async () => {
    //function for getting the pdf files within the phone library
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: false,
    });
    // Alert.alert("Audio File", result.name);
    console.log(result);
    if (result.type === "success") {
      Alert.alert("PDF File", result.name);
      setPdf(result);
    } else {
      alert("something went wrong!!");
    }
  };

  const uploadPDF = async () => {
    //function for uploading the files to the firebase storage
    const childPath = `pdf/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;
    console.log(childPath);
    const uri = FileSystem.documentDirectory + pdf.name;

    await FileSystem.copyAsync({
      from: pdf.uri,
      to: uri,
    });

    let res = await fetch(uri);
    let blob = await res.blob();

    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      setLoading((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        saveUserData(snapshot);
        setLoading(null);
        console.log(snapshot);
      });
    };

    const taskError = (snapshot) => {
      setLoading(null);
      alert(snapshot);
      console.log(snapshot);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const saveUserData = (downloadURL) => {
    //function for saving the data
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        downloadURL,
        note,
        applicant: "1",
        status: "0",
        userLanguage,
        secondLanguage,
        thirdLanguage,
      })
      .then(function () {
        alert("Thanks for applying as a validator");
        setLoading(null);
        navigation.popToTop();
      });
  };

  const renderDatalist = () => {
    return datalist.map((languages) => (
      <Picker.Item label={languages.language} value={languages.id} />
    ));
  };
  const renderDatalist2 = () => {
    return datalist.map((languages) => (
      <Picker.Item label={languages.language} value={languages.id} />
    ));
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.bodycontainer}>
        <View style={{}}>
          <View>
            <Text style={[styles.text, { color: "#000000" }]}>
              Be an ALIMA Validator
            </Text>
          </View>
          <Text style={{ textAlign: "justify" }}>
            An ALIMA Validator must be from the Tribe, a linguist, or speaks the{" "}
            language. He/She will validate submissions and contributions of
            different words.
          </Text>
        </View>

        <View style={{ marginVertical: 5 }}>
          <Text style={[styles.text, { fontSize: 16 }]}>Resume</Text>
          <TouchableOpacity
            style={[styles.addButton, { height: 90 }]}
            onPress={() => chooseFile()}
          >
            <MaterialCommunityIcons
              name="file-pdf-box"
              size={35}
              color="#70707033"
            />
            {pdf ? (
              <TextInput>{pdf?.name}</TextInput>
            ) : (
              <Text style={{ color: "#B1B1B1", fontSize: 12 }}>
                {" "}
                Upload Resume File
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <View>
          <Text style={[styles.text, { fontSize: 16 }]}>
            What languages do you speak?
          </Text>
        </View>
        <View style={styles.Checkbox}>
          <Picker
            style={styles.input}
            selectedValue={userLanguage}
            onValueChange={(itemValue, itemIndex) => setuserLanguage(itemValue)}
          >
            {renderDatalist()}
          </Picker>
          <View>
            <Text style={[styles.text, { fontSize: 16 }]}>
              Secondary Languages
            </Text>
          </View>
          <Picker
            style={styles.input}
            selectedValue={secondLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setsecondLanguage(itemValue)
            }
          >
            <Picker.Item label={"None"} value={"None"} />
            {renderDatalist()}
          </Picker>
          <Picker
            style={styles.input}
            selectedValue={thirdLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setthirdLanguage(itemValue)
            }
          >
            <Picker.Item label={"None"} value={"None"} />
            {renderDatalist()}
          </Picker>
        </View>
        <View>
          <Text style={[styles.text, { fontSize: 16 }]}>
            Why should you be our validator?
          </Text>
          <Text>
            Explain why do you want to become an ALIMA Validator. Share your
            experiences.
          </Text>
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
            style={[styles.button, { backgroundColor: "#215A88" }]}
            onPress={() => uploadPDF()}
          >
            <Text style={[styles.text, { fontSize: 16, color: "white" }]}>
              {loading ? `Submitting ...  ${parseInt(loading)}%` : "Submit"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default ValidatorApplication;
const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    top: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
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
    marginTop: 10,
    justifyContent: "center",
  },
  Checkbox: {
    flex: 1,
    marginTop: 5,
  },
});
