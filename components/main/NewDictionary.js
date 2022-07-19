import React, { useEffect, useState } from "react";
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
import { useValidation } from "react-native-form-validator";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";

function NewDictionary({ currentUser, route, navigation }) {
  const [word, setWord] = useState("");
  const [name, setName] = useState("Anonymous");
  const [filipino, setFilipino] = useState("");
  const [sentence, setSentence] = useState("");
  const [classification, setClassification] = useState("");
  const [englishMeaning, setEnglishMeaning] = useState("");
  const [meaning, setMeaning] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(null);
  const [wordID, setWordID] = useState(makeid());
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const { language } = route?.params ?? {};
  console.log(language);
  function makeid() {
    var randomText = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 15; i++)
      randomText += possible.charAt(
        Math.floor(Math.random() * possible.length)
      );

    return randomText;
  }

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const filteredWord = Capitalize(word);
  const filteredFilipino = Capitalize(filipino);
  const filteredSentence = Capitalize(sentence);
  const filteredClassification = Capitalize(classification);
  const filteredEnglishMeaning = Capitalize(englishMeaning);
  const filteredMeaning = Capitalize(meaning);
  const filteredPronunciation = Capitalize(pronunciation);

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: {
        word,
        filipino,
        sentence,
        pronunciation,
        englishMeaning,
        meaning,
        audio,
      },
    });

  const chooseFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "audio/*",
      copyToCacheDirectory: false,
    });
    // Alert.alert("Audio File", result.name);

    console.log(result);
    if (result.type === "success") {
      setAudio(result);
      // console.log(result);
    } else {
      alert("something went wrong!!");
    }
  };

  // const uploadAudios = async () => {
  //   // const uri = recording.getURI();
  //   const uri = FileSystem.documentDirectory + audio.name;

  //   await FileSystem.copyAsync({
  //     from: audio.uri,
  //     to: uri,
  //   });

  //   try {
  //     // const blob = await new Promise((resolve, reject) => {
  //     //   const xhr = new XMLHttpRequest();
  //     //   xhr.onload = () => {
  //     //     try {
  //     //       resolve(xhr.response);
  //     //     } catch (error) {
  //     //       console.log("error:12", error);
  //     //     }
  //     //   };
  //     //   xhr.onerror = (e) => {
  //     //     console.log(e);
  //     //     reject(new TypeError("Network request failed"));
  //     //   };
  //     //   xhr.responseType = "blob";
  //     //   xhr.open("GET", `file://${audio?.uri}`, true);
  //     //   xhr.send(null);
  //     // });
  //     // console.log('file://'+audio?.uri)
  //     // let u = (`file://${audio?.uri}`)
  //     let res = await fetch(uri);
  //     let blobs = await res.blob();
  //     if (blobs != null) {
  //       const uriParts = audio?.uri.split(".");
  //       const fileType = uriParts[uriParts.length - 1];
  //       console.log(uriParts, "0-0-0", fileType);
  //       // firebase
  //       //   .storage()
  //       //   .ref()
  //       //   .child(`nameOfTheFile.${fileType}`)
  //       //   .put(blob, {
  //       //     contentType: `audio/${fileType}`,
  //       //   })
  //       //   .then(() => {
  //       //     console.log("Sent!");
  //       //   })
  //       //   .catch((e) => console.log("error:", e));
  //     } else {
  //       console.log("erroor with blob");
  //     }
  //   } catch (error) {
  //     console.log("error:", error);
  //   }
  // };

  const uploadAudio = async () => {
    validate({
      word: { required: true },
      filipino: { required: true },
      pronunciation: { required: true },
      sentence: { required: true },
      englishMeaning: { required: true },
      meaning: { required: true },
      audio: { required: true },
    });
    const childPath = `audio/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;
    console.log(childPath);
    const uri = FileSystem.documentDirectory + audio.name;

    await FileSystem.copyAsync({
      from: audio.uri,
      to: uri,
    });

    let res = await fetch(uri);
    let blob = await res.blob();

    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      setLoading((snapshot.bytesTransferred / audio?.size) * 100);
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        if (toggleCheckBox == true) {
          //If the textbox is ticked then it will include the name of the user.
          saveAllPostData(snapshot);
        } else if (toggleCheckBox == false) {
          //If the textbox is not ticked then it will not include the name of the user, instead it will be anonymous.
          savePostData(snapshot);
        }
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

  /* Saving data to the firestore*/

  const saveAllPostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("languages")
      .doc(language)
      .collection("dictionary")
      .add({
        uid: firebase.auth().currentUser.uid,
        wordId: wordID,
        email: currentUser.email,
        name: currentUser.name,
        downloadURL,
        word: filteredWord,
        filipino: filteredFilipino,
        classification: filteredClassification,
        pronunciation: filteredPronunciation,
        sentence: filteredSentence,
        englishMeaning: filteredEnglishMeaning,
        meaning: filteredMeaning,
        status: "0",
        upload: "1",
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        alert("Thanks for contribution!!");
        setLoading(null);
        navigation.navigate("ContributeDictionary");
      });
  };

  const savePostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("languages")
      .doc(language)
      .collection("dictionary")
      .add({
        uid: firebase.auth().currentUser.uid,
        wordId: wordID,
        email: currentUser.email,
        name,
        downloadURL,
        word: filteredWord,
        filipino: filteredFilipino,
        classification: filteredClassification,
        pronunciation: filteredPronunciation,
        sentence: filteredSentence,
        englishMeaning: filteredEnglishMeaning,
        meaning: filteredMeaning,
        status: "0",
        upload: "1",
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        alert("Thanks for contribution!!");
        setLoading(null);
        navigation.navigate("ContributeDictionary");
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.center}>
        <View style={styles.paddingLeft}>
          <Text style={styles.title_text}>Word </Text>
          <Text style={styles.guidelines}>
            {" "}
            Type the word you want to contribute.{" "}
          </Text>
          {isFieldInError("word") &&
            getErrorsInField("word").map((errorMessage) => (
              <Text style={{ color: "red" }}>Please enter the word</Text>
            ))}
          <TextInput
            style={styles.input}
            multiline={true}
            autoCapitalize="none"
            onChangeText={(word) => setWord(word)}
          />
        </View>

        <View style={styles.paddingLeft}>
          <Text style={styles.title_text}>In Filipino </Text>
          <Text style={styles.guidelines}>
            Translate the word you have suggested to Filipino{" "}
          </Text>
          {isFieldInError("filipino") &&
            getErrorsInField("filipino").map((errorMessage) => (
              <Text style={{ color: "red" }}>
                Please enter the filipino word
              </Text>
            ))}
          <TextInput
            style={styles.input}
            multiline={true}
            onChangeText={(filipino) => setFilipino(filipino)}
          />
        </View>

        <View style={styles.paddingLeft}>
          <Text style={styles.title_text}>Classification </Text>
          <Text style={styles.guidelines}>
            Classification of the word ex.(Verb, Noun, Pronoun, Adverb){" "}
          </Text>
          <Picker
            style={styles.input}
            selectedValue={classification}
            onValueChange={(itemValue, itemIndex) =>
              setClassification(itemValue)
            }
          >
            <Picker.Item label="Noun" value="Noun" />
            <Picker.Item label="Verb" value="Verb" />
            <Picker.Item label="Adverb" value="Adverb" />
            <Picker.Item label="Adjective" value="Adjective" />
          </Picker>
        </View>

        <View style={styles.paddingLeft}>
          <Text style={styles.title_text}>Pronunciation </Text>
          <Text style={styles.guidelines}>
            How to pronounce the word, Ex. Ka-gan.{" "}
          </Text>
          {isFieldInError("pronunciation") &&
            getErrorsInField("pronunciation").map((errorMessage) => (
              <Text style={{ color: "red" }}>
                Please enter the Pronunciation
              </Text>
            ))}
          <TextInput
            style={styles.input}
            multiline={true}
            onChangeText={(pronunciation) => setPronunciation(pronunciation)}
          />
        </View>

        <View style={styles.paddingLeft}>
          <Text style={styles.title_text}>Example Sentence</Text>
          <Text style={styles.guidelines}>
            Write an example of the word you have suggested.
          </Text>
          {isFieldInError("sentence") &&
            getErrorsInField("sentence").map((errorMessage) => (
              <Text style={{ color: "red" }}>
                Please enter an example sentence
              </Text>
            ))}
          <TextInput
            style={styles.input}
            multiline={true}
            onChangeText={(sentence) => setSentence(sentence)}
          />
        </View>
        <View style={styles.paddingLeft}>
          <Text style={styles.title_text}>English Meaning </Text>
          <Text style={styles.guidelines}>
            Define the word you have suggested in English.
          </Text>
          {isFieldInError("englishMeaning") &&
            getErrorsInField("englishMeaning").map((errorMessage) => (
              <Text style={{ color: "red" }}>
                Please enter the english meaning
              </Text>
            ))}
          <TextInput
            style={styles.description_input}
            multiline={true}
            onChangeText={(englishMeaning) => setEnglishMeaning(englishMeaning)}
          />
        </View>

        <View style={styles.paddingLeft}>
          <Text style={styles.title_text}>Meaning </Text>
          <Text style={styles.guidelines}>
            Define the word you have suggested in Filipino.
          </Text>
          {isFieldInError("meaning") &&
            getErrorsInField("meaning").map((errorMessage) => (
              <Text style={{ color: "red" }}>
                Please enter the Filipino meaning
              </Text>
            ))}
          <TextInput
            style={styles.description_input}
            multiline={true}
            onChangeText={(meaning) => setMeaning(meaning)}
          />
        </View>
        <View style={styles.paddingLeft}>
          <Text style={styles.title_text}>Audio </Text>
          <Text style={styles.guidelines}>
            Upload an audio on how to pronounce the word you have contributed.
          </Text>
          {isFieldInError("audio") &&
            getErrorsInField("aduio").map((errorMessage) => (
              <Text style={{ color: "red" }}>Please select an audio file</Text>
            ))}
          <TouchableOpacity
            style={styles.audioButton}
            onPress={() => chooseFile()}
          >
            <View>
              {audio ? (
                <TextInput>{audio?.name}</TextInput>
              ) : (
                <MaterialCommunityIcons
                  style={styles.addAudio}
                  name="plus-box"
                  color={"#707070"}
                  size={26}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.paddingLeft}>
          <Text style={styles.title_text}>Username </Text>
          {toggleCheckBox == true ? (
            <TextInput
              style={styles.input}
              multiline={true}
              value={currentUser.name}
              editable={false}
            />
          ) : null}
          {toggleCheckBox == false ? (
            <TextInput
              style={styles.input}
              multiline={true}
              value={name}
              editable={false}
            />
          ) : null}
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            style={styles.checkbox}
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
            color={toggleCheckBox ? "#215a88" : undefined}
          />
          <Text style={styles.guidelines}> I allow my name to be shown. </Text>
        </View>
      </View>
      {audio ? (
        <Pressable style={styles.button} onPress={() => uploadAudio()}>
          <Text style={styles.subtitle}>
            {loading ? `Sharing...  ${parseInt(loading)}%` : "Share"}
          </Text>
        </Pressable>
      ) : (
        <Pressable style={styles.button_empty} disabled={true}>
          <Text style={styles.subtitle}>
            {loading ? `Sharing...  ${parseInt(loading)}%` : "Share"}
          </Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(NewDictionary);
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
  button: {
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 1,
    width: "90%",
    backgroundColor: "#215a88",
    //top: 130,
    marginTop: 20,
    marginBottom: 80,
  },
  button_empty: {
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 1,
    width: "90%",
    backgroundColor: "#91B2EB",
    //top: 130,
    marginTop: 20,
    marginBottom: 80,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    marginRight: 50,
    paddingRight: 90,
    justifyContent: "center",
    paddingTop: 10,
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
    fontSize: 12,
    fontStyle: "italic",
    color: "#707070",
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
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});
