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
import { Audio } from "expo-av";
import { updateDictionary } from "../../redux/actions";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

function Validation({ currentUser, route, navigation }) {
  const [loading, setLoading] = useState(false);
  const { data } = route?.params ?? {};
  const [word, setWord] = useState(data?.word);
  const [name, setName] = useState(data?.name);
  const [filipino, setFilipino] = useState(data?.filipino);
  const [sentence, setSentence] = useState(data?.sentence);
  const [classification, setClassification] = useState(data?.classification);
  const [originated, setOrigination] = useState(data?.originated);
  const [englishMeaning, setEnglishMeaning] = useState(data?.englishMeaning);
  const [meaning, setMeaning] = useState(data?.meaning);
  const [pronunciation, setPronunciation] = useState(data?.pronunciation);
  const [audio, setAudio] = useState(null);

  const chooseFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "audio/*",
      copyToCacheDirectory: false,
    });
    // Alert.alert("Audio File", result.name);

    console.log(result);
    if (result.type === "success") {
      setAudio(result);
    } else {
      alert("Please choose a file.");
    }
  };

  const downloadAudio = async () => {
    let SoundObject = new Audio.Sound();
    try {
      await SoundObject.loadAsync({ uri: data.downloadURL });
      const status = await SoundObject.playAsync();
      setTimeout(() => {
        SoundObject.unloadAsync();
      }, status.playableDurationMillis + 1000);
    } catch (error) {
      console.log(error);
      await SoundObject.unloadAsync(); // Unload any sound loaded
      SoundObject.setOnPlaybackStatusUpdate(null); // Unset all playback status loaded
      retryPlaySound();
    }
  };

  const retryPlaySound = () => downloadAudio();

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const filteredWord = Capitalize(word);
  const filteredFilipino = Capitalize(filipino);
  const filteredOrigin = Capitalize(originated);
  const filteredSentence = Capitalize(sentence);
  const filteredClassification = Capitalize(classification);
  const filteredEnglishMeaning = Capitalize(englishMeaning);
  const filteredMeaning = Capitalize(meaning);
  const filteredPronunciation = Capitalize(pronunciation);

  const Update = async () => {
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
        saveAllPostData(snapshot);
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

  const saveAllPostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("languages")
      .doc(data?.language)
      .collection("dictionary")
      .doc(`${data?.id}`)
      .update({
        email: currentUser.email,
        name: currentUser.name,
        downloadURL,
        word: filteredWord,
        filipino: filteredFilipino,
        originated: filteredOrigin,
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
        alert("Contribution Updated");
        setLoading(null);
        navigation.goBack();
      });
  };
  if (data?.status == "2") {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.center}>
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>Word </Text>

            <TextInput
              style={[styles.input, { color: "black" }]}
              value={data?.word}
              multiline={true}
              editable={false}
            />
          </View>
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>In Filipino</Text>

            <TextInput
              style={[styles.input, { color: "black" }]}
              value={data?.filipino}
              multiline={true}
              editable={false}
            />
          </View>
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>Classification </Text>

            <TextInput
              style={[styles.input, { color: "black" }]}
              value={data?.classification}
              multiline={true}
              editable={false}
            />
          </View>
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>Pronunciation </Text>

            <TextInput
              style={[styles.input, { color: "black" }]}
              value={data?.pronunciation}
              multiline={true}
              editable={false}
            />
          </View>

          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>Sentence Example </Text>

            <TextInput
              style={[styles.input, { color: "black" }]}
              value={data?.sentence}
              multiline={true}
              editable={false}
            />
          </View>
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>English Meaning </Text>
            <TextInput
              style={[styles.description_input, { color: "black" }]}
              value={data?.englishMeaning}
              multiline={true}
              editable={false}
            />
          </View>

          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>Filipino Meaning </Text>
            <TextInput
              style={[styles.description_input, { color: "black" }]}
              value={data?.meaning}
              multiline={true}
              editable={false}
            />
          </View>
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>Audio </Text>
            <Text style={styles.guidelines}></Text>
            <TouchableOpacity
              style={styles.audioButton}
              onPress={() => downloadAudio()}
            >
              <View>
                <MaterialCommunityIcons
                  style={styles.addAudio}
                  name="volume-high"
                  color={"#707070"}
                  size={26}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>Decline note </Text>
            <TextInput
              style={[styles.description_input, { color: "black" }]}
              value={data?.note}
              multiline={true}
              editable={false}
            />
          </View>
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>Validated By </Text>
            <TextInput
              style={[styles.input, { color: "black" }]}
              value={data?.validatedBy}
              multiline={true}
              editable={false}
            />
          </View>
        </View>
      </ScrollView>
    );
  } else if (data?.status == "1") {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.center}>
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>Word </Text>

            <TextInput
              style={[styles.input, { color: "black" }]}
              value={data?.word}
              multiline={true}
              editable={false}
            />
          </View>
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>In Filipino </Text>

            <TextInput
              style={[styles.input, { color: "black" }]}
              value={data?.filipino}
              multiline={true}
              editable={false}
            />
          </View>
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>Classification </Text>

            <TextInput
              style={[styles.input, { color: "black" }]}
              value={data?.classification}
              multiline={true}
              editable={false}
            />
          </View>
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>Pronunciation </Text>

            <TextInput
              style={[styles.input, { color: "black" }]}
              value={data?.pronunciation}
              multiline={true}
              editable={false}
            />
          </View>

          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>Sentence Example </Text>

            <TextInput
              style={[styles.input, { color: "black" }]}
              value={data?.sentence}
              multiline={true}
              editable={false}
            />
          </View>
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>English Meaning </Text>
            <TextInput
              style={[styles.description_input, { color: "black" }]}
              value={data?.englishMeaning}
              multiline={true}
              editable={false}
            />
          </View>

          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>Filipino Meaning </Text>
            <TextInput
              style={[styles.description_input, { color: "black" }]}
              value={data?.meaning}
              multiline={true}
              editable={false}
            />
          </View>
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>Audio </Text>
            <Text style={styles.guidelines}></Text>
            <TouchableOpacity
              style={styles.audioButton}
              onPress={() => downloadAudio()}
            >
              <View>
                <MaterialCommunityIcons
                  style={styles.addAudio}
                  name="volume-high"
                  color={"#707070"}
                  size={26}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>Validated By </Text>
            <TextInput
              style={[styles.input, { color: "black" }]}
              value={data?.validatedBy}
              multiline={true}
              editable={false}
            />
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.center}>
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>Word </Text>

            <TextInput
              style={[styles.input, { color: "black" }]}
              value={word}
              multiline={true}
              onChangeText={(word) => setWord(word)}
            />
          </View>
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>In Filipino</Text>

            <TextInput
              style={[styles.input, { color: "black" }]}
              value={filipino}
              multiline={true}
              onChangeText={(filipino) => setFilipino(filipino)}
            />
          </View>
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>Classification </Text>

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
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>Origination </Text>

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
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>Pronunciation </Text>

            <TextInput
              style={[styles.input, { color: "black" }]}
              value={pronunciation}
              multiline={true}
              onChangeText={(pronunciation) => setPronunciation(pronunciation)}
            />
          </View>

          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>Sentence Example </Text>

            <TextInput
              style={[styles.input, { color: "black" }]}
              value={sentence}
              multiline={true}
              onChangeText={(sentence) => setSentence(sentence)}
            />
          </View>
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>English Meaning </Text>
            <TextInput
              style={[styles.description_input, { color: "black" }]}
              value={englishMeaning}
              multiline={true}
              onChangeText={(englishMeaning) =>
                setEnglishMeaning(englishMeaning)
              }
            />
          </View>

          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>Filipino Meaning </Text>
            <TextInput
              style={[styles.description_input, { color: "black" }]}
              value={meaning}
              multiline={true}
              onChangeText={(meaning) => setMeaning(meaning)}
            />
          </View>
          <View style={styles.paddingLeft}>
            <Text style={styles.title_text}>Audio </Text>
            <View>
              <Pressable onPress={() => chooseFile()}>
                <Text style={styles.edit_audio}> Change Audio </Text>
              </Pressable>
            </View>
            <TouchableOpacity
              style={styles.audioButton}
              onPress={() => downloadAudio()}
            >
              <View>
                {audio ? (
                  <TextInput>{audio?.name}</TextInput>
                ) : (
                  <MaterialCommunityIcons
                    style={styles.addAudio}
                    name="volume-high"
                    color={"#707070"}
                    size={26}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Pressable style={styles.buttonAccept} onPress={() => Update()}>
              <Text style={styles.subtitle}>
                {loading ? "Updating..." : "Update"}
              </Text>
            </Pressable>
            <Pressable
              style={styles.buttonDecline}
              onPress={() =>
                navigation.navigate("Delete", {
                  data: data,
                })
              }
            >
              <Text style={styles.subtitle}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(Validation);
const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    // /justifyContent: "center",
    top: 1,
    //left: 40,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 100,
    marginTop: 30,
  },
  subtitle: {
    alignSelf: "center",
    fontSize: 18,

    letterSpacing: 0.25,
    color: "white",
  },
  buttonAccept: {
    // alignSelf: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    // elevation: 1,
    width: "40%",
    backgroundColor: "#73B504",
    //top: 130,
    // marginTop: 20,
    // marginBottom: 80,
  },
  button: {
    // alignSelf: "flex-end",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    // elevation: 1,
    width: "40%",
    backgroundColor: "#8E2835",
    //top: 130,
    // marginBottom: 100,
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
    paddingVertical: 15,
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
  buttonAccept: {
    // alignSelf: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    // elevation: 1,
    width: "40%",
    backgroundColor: "#73B504",
    //top: 130,
    // marginTop: 20,
    // marginBottom: 80,
  },
  buttonDecline: {
    // alignSelf: "flex-end",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    // elevation: 1,
    width: "40%",
    backgroundColor: "#8E2835",
    //top: 130,
    // marginBottom: 100,
  },
  edit_audio: {
    fontSize: 15,
    fontStyle: "italic",
    color: "#215A88",
    marginLeft: 220,
  },
});
