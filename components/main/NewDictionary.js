import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  ImageBackground,
  DevSettings,
} from "react-native";
import { TextInput, Text } from "react-native-paper";

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
  const [originated, setOrigination] = useState("");
  const [englishMeaning, setEnglishMeaning] = useState("");
  const [englishWord, setEnglishWord] = useState("");
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

  const clearWord = (val) => {
    setWord("");
  };
  const clearFilipino = (val) => {
    setFilipino("");
  };
  const clearSentence = (val) => {
    setSentence("");
  };
  const clearEnglishMeaning = (val) => {
    setEnglishMeaning("");
  };
  const clearEnglishWord = (val) => {
    setEnglishWord("");
  };

  const clearMeaning = (val) => {
    setMeaning("");
  };
  const clearPronunciation = (val) => {
    setPronunciation("");
  };
  const clearAudio = (val) => {
    setAudio(null);
  };

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const filteredWord = Capitalize(word);
  const filteredFilipino = Capitalize(filipino);
  const filteredOrigin = Capitalize(originated);
  const filteredSentence = Capitalize(sentence);
  const filteredClassification = Capitalize(classification);
  const filteredEnglishMeaning = Capitalize(englishMeaning);
  const filteredEnglishWord = Capitalize(englishWord);
  const filteredMeaning = Capitalize(meaning);
  const filteredPronunciation = Capitalize(pronunciation);

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: {
        word,
        filipino,
        sentence,
        originated,
        pronunciation,
        englishMeaning,
        englishWord,
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
      alert("Something went wrong!");
    }
  };

  const uploadAudio = async () => {
    validate({
      word: { required: true },
      filipino: { required: true },
      originated: { required: true },
      pronunciation: { required: true },
      sentence: { required: true },
      englishMeaning: { required: true },
      englishWord: { required: true },
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
        language: language,
        word: filteredWord,
        filipino: filteredFilipino,
        originated: filteredOrigin,
        classification: filteredClassification,
        pronunciation: filteredPronunciation,
        sentence: filteredSentence,
        englishMeaning: filteredEnglishMeaning,
        englishWord: filteredEnglishWord,
        meaning: filteredMeaning,
        status: "0",
        upload: "1",
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        alert(
          "Thanks for your contribution! Your contribution will be validated"
        );
        setLoading(null);
        navigation.navigate("NewDictionary", { language: language });
        clearWord(word);
        clearFilipino(filipino);
        clearSentence(sentence);
        clearEnglishMeaning(englishMeaning);
        clearEnglishWord(englishWord);
        clearMeaning(meaning);
        clearPronunciation(pronunciation);
        clearAudio(audio);
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
        language: language,
        filipino: filteredFilipino,
        originated: filteredOrigin,
        classification: filteredClassification,
        pronunciation: filteredPronunciation,
        sentence: filteredSentence,
        englishMeaning: filteredEnglishMeaning,
        englishWord: filteredEnglishWord,
        meaning: filteredMeaning,
        status: "0",
        upload: "1",
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        alert(
          "Thanks for your contribution! Your contribution will be validated"
        );
        setLoading(null);
        navigation.navigate("NewDictionary", { language: language });
        clearWord(word);
        clearFilipino(filipino);
        clearSentence(sentence);
        clearEnglishMeaning(englishMeaning);
        clearEnglishWord(englishWord);
        clearMeaning(meaning);
        clearPronunciation(pronunciation);
        clearAudio(audio);
      });
  };

  return (
    <ImageBackground
      source={require("../../assets/wordbg.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <ScrollView style={styles.container}>
        <View style={styles.center}>
          {/* Word */}
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>
              Word<Text style={{ color: "red" }}>*</Text>
            </Text>
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
              value={word}
              multiline={true}
              autoCapitalize="none"
              onChangeText={(word) => setWord(word)}
            />
          </View>

          {/* Specific Language Meaning */}
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>
              Bisaya Definition
              <Text style={{ color: "red" }}>*</Text>
            </Text>
            <Text style={styles.guidelines}>
              Define the word you have suggested in Bisaya.
            </Text>
            {isFieldInError("meaning") &&
              getErrorsInField("meaning").map((errorMessage) => (
                <Text style={{ color: "red" }}>Please provide definition</Text>
              ))}
            <TextInput
              style={styles.description_input}
              multiline={true}
              value={meaning}
              onChangeText={(meaning) => setMeaning(meaning)}
            />
          </View>

          {/* Parts of Speech */}
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>
              Originated<Text style={{ color: "red" }}>*</Text>
            </Text>
            <Text style={styles.guidelines}>
              Classification of the word's origin ex.(Davao del Sur, Davao del
              Norte, Davao de Oro, etc.){" "}
            </Text>
            <Picker
              style={[styles.input, { backgroundColor: "#e7e7e7" }]}
              selectedValue={originated}
              onValueChange={(itemValue, itemIndex) =>
                setOrigination(itemValue)
              }
            >
              <Picker.Item label="Pick origin" value="" />
              <Picker.Item label="Davao del Sur" value="Davao del Sur" />
              <Picker.Item label="Davao del Norte" value="Davao del Norte" />
              <Picker.Item label="Davao Occidental" value="Davao Occidental" />
              <Picker.Item label="Davao Oriental" value="Davao Oriental" />
              <Picker.Item label="Davao de Oro" value="Davao de Oro" />
              <Picker.Item label="Davao City" value="Davao City" />
              <Picker.Item label="None from the choices" value="Other" />
              <Picker.Item label="N/A" value="N/A" />
            </Picker>
          </View>

          {/* Example Sentence */}
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>
              Example Sentence<Text style={{ color: "red" }}>*</Text>
            </Text>
            <Text style={styles.guidelines}>
              Write an example of the word you have suggested.
            </Text>
            {isFieldInError("sentence") &&
              getErrorsInField("sentence").map((errorMessage) => (
                <Text style={{ color: "red" }}>
                  Please enter an example sentence.
                </Text>
              ))}
            <TextInput
              style={styles.input}
              multiline={true}
              value={sentence}
              onChangeText={(sentence) => setSentence(sentence)}
            />
          </View>

          {/* In Filipino */}
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>
              In Filipino<Text style={{ color: "red" }}>*</Text>
            </Text>
            <Text style={styles.guidelines}>
              Translate the word you have suggested to Filipino{" "}
            </Text>
            {isFieldInError("filipino") &&
              getErrorsInField("filipino").map((errorMessage) => (
                <Text style={{ color: "red" }}>
                  Please enter the filipino word.
                </Text>
              ))}
            <TextInput
              style={styles.input}
              multiline={true}
              value={filipino}
              onChangeText={(filipino) => setFilipino(filipino)}
            />
          </View>

            {/* Filipino Definition */}
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>English Word</Text>
            <Text style={styles.guidelines}>
              Define the word you have suggested in Filipino.
            </Text>
            {isFieldInError("englishWord") &&
              getErrorsInField("englishWord").map((errorMessage) => (
                <Text style={{ color: "red" }}>Please define in Filipino.</Text>
              ))}
            <TextInput
              style={styles.description_input}
              multiline={true}
              value={englishWord}
              onChangeText={(englishWord) =>
                setEnglishMeaning(englishWord)
              }
            />
          </View>

          {/* Filipino Definition */}
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>Filipino Definition</Text>
            <Text style={styles.guidelines}>
              Define the word you have suggested in Filipino.
            </Text>
            {isFieldInError("englishMeaning") &&
              getErrorsInField("englishMeaning").map((errorMessage) => (
                <Text style={{ color: "red" }}>Please define in Filipino.</Text>
              ))}
            <TextInput
              style={styles.description_input}
              multiline={true}
              value={englishMeaning}
              onChangeText={(englishMeaning) =>
                setEnglishMeaning(englishMeaning)
              }
            />
          </View>
          

          {/* Parts of Speech */}
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>Parts of Speech</Text>
            <Text style={styles.guidelines}>
              Classification of the word (E.g. Verb, Noun, Pronoun, Adverb,
              etc.){" "}
            </Text>
            <Picker
              style={[styles.input, { backgroundColor: "#e7e7e7" }]}
              selectedValue={classification}
              onValueChange={(itemValue, itemIndex) =>
                setClassification(itemValue)
              }
            >
              <Picker.Item label="Noun" value="Noun" />
              <Picker.Item label="Verb" value="Verb" />
              <Picker.Item label="Adverb" value="Adverb" />
              <Picker.Item label="Adjective" value="Adjective" />
              <Picker.Item label="Pronoun" value="Pronoun" />
              <Picker.Item label="Preposition" value="Preposition" />
              <Picker.Item label="Conjunction" value="Conjunction" />
              <Picker.Item label="Article" value="Article" />
            </Picker>
          </View>

          {/* Pronunciation */}
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>Pronunciation </Text>
            <Text style={styles.guidelines}>
              How to pronounce the word, Ex. Ka-gan.{" "}
            </Text>
            {/* {isFieldInError("pronunciation") &&
      getErrorsInField("pronunciation").map((errorMessage) => (
        <Text style={{ color: "red" }}>
          Please enter the Pronunciation
        </Text>
      ))} */}
            <TextInput
              style={styles.input}
              multiline={false}
              value={pronunciation}
              onChangeText={(pronunciation) => setPronunciation(pronunciation)}
            />
          </View>

          {/* AUDIO RECORD */}
          

          {/* AUDIO */}
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>Audio<Text style={{ color: "red" }}>*</Text></Text>
            <Text style={styles.guidelines}>
              Upload an audio on how to pronounce the word you have contributed.
            </Text>
            {isFieldInError("audio") &&
              getErrorsInField("aduio").map((errorMessage) => (
                <Text style={{ color: "red" }}>
                  Please select an audio file
                </Text>
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
            <Text style={styles.guidelines}>
              {" "}
              I allow my name to be shown.{" "}
            </Text>
          </View>
        </View>
        {audio ? (
          <TouchableOpacity style={styles.button} onPress={() => uploadAudio()}>
            <Text style={styles.subtitle}>
              {loading ? `Sharing...  ${parseInt(loading)}%` : "Share"}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button_empty} disabled={true}>
            <Text style={styles.subtitle}>
              {loading ? `Sharing...  ${parseInt(loading)}%` : "Share"}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </ImageBackground>
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
  image: {
    flex: 1,
    justifyContent: "center",
    height: 720,
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
    backgroundColor: "#e7e7e7",
    //borderWidth: 1,
    borderRadius: 6,
    height: 82,
    borderColor: "#707070",
    paddingTop: 10,
    marginTop: 20,
  },
  guidelines: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#707070",
  },
  addAudio: {
    flex: 1,
    //justifyContent:'center',
    paddingTop: 15,
    alignSelf: "center",
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
    letterSpacing: 0.15,
    height: 50,
    width: "95%",
    paddingLeft: 12,
    paddingTop: 0,
    marginTop: 10,
    //borderWidth: 1,
    borderRadius: 5,
    //borderColor: "#707070",
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
    //borderWidth: 1,
    borderRadius: 5,
    //borderColor: "#707070",
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
