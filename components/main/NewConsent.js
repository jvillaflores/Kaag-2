import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity, 
  RefreshControl,
  ImageBackground,

  
} from "react-native";

import {
  Title,
  TextInput,
  Text,
  TouchableRipple,
} from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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


function ContributionWord({ currentUser, navigation, route }) {
  const [word, setWord] = useState("");
  const [name, setName] = useState("Anonymous");
  const [filipino, setFilipino] = useState("");
  const [sentence, setSentence] = useState("");
  const [classification, setClassification] = useState("");
  const [originated, setOrigination] = useState("");
  const [englishMeaning, setEnglishMeaning] = useState("");
  const [meaning, setMeaning] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(null);
  const [wordID, setWordID] = useState(makeid());
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const { language } = route?.params ?? {};

 
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
  const filteredOrigin = Capitalize(originated);
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
        originated,
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
  
  const uploadAudio = async () => {
    validate({
      word: { required: true },
      filipino: { required: true },
      originated: { required: true },
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
  const consent = (downloadURL)=>{
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        terms:"1"
      })
      .then(function () {
        setLoading(null);
      });
  }
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
        originated: filteredOrigin,
        classification: filteredClassification,
        pronunciation: filteredPronunciation,
        sentence: filteredSentence,
        englishMeaning: filteredEnglishMeaning,
        meaning: filteredMeaning,
        language: language,
        status: "0",
        upload: "1",
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        alert("Thanks for contribution!!");
        setLoading(null);
        navigation.navigate("ContributionWord");
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
        originated: filteredOrigin,
        classification: filteredClassification,
        pronunciation: filteredPronunciation,
        sentence: filteredSentence,
        englishMeaning: filteredEnglishMeaning,
        meaning: filteredMeaning,
        language: language,
        status: "0",
        upload: "1",
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        
        alert("Thanks for contribution!!");
        
        setLoading(null);
        navigation.navigate("ContributionWord");
      });
  };
  

    return (
        <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHead}>Would you like to contribute again?</Text>
          <Text style={styles.description}>
            
          </Text>
        </View>
  
  
        <View style={{flexDirection:"row", justifyContent:'center'}}>
        
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#D6D6D6" }]}
            onPress={() => navigation.navigate("Course")}
          >
            <Text style={[styles.text, { fontSize: 16, color: "#8E8E8E" }]}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#215a88" }]}
            onPress={() => navigation.navigate("NewDictionary", { language: language })}
          >
            <Text style={[styles.text, { fontSize: 16, color: "white" }]}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
        
      
      
    );
  
}
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(ContributionWord);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        paddingHorizontal:30,
        marginTop:'50%',
      },
      header: {
        paddingVertical: 20,
      },
      textHead: {
        flexDirection: "row",
        fontSize: 20,
        fontWeight: "bold",
        lineHeight: 21,
        letterSpacing: 0.25,
        color: "black",
        textAlign:'center',
      },
      description: {
        flexDirection: "row",
        fontSize: 13,
        lineHeight: 20,
        letterSpacing: 0.25,
        color: "black",
        //marginRight: 35,
        textAlign: "justify",
        marginTop: 10,
      },
      button: {
        justifyContent: "center",
        padding: 10,
        borderRadius: 10,
        margin: 10,
        width:"45%",
        paddingVertical:15,
        elevation: 3,
        //height:'45%',
    
      },
      text: {
        fontSize: 15,
        fontWeight: "bold",
        letterSpacing: 0.25,
        alignSelf:'center',
      },
      Cheader:{
        paddingVertical: 15,
      },
      Ccontainer:{
        flex: 1,
        top: 30,
      },
      checkboxContainer: {
        flexDirection: "row",
        marginVertical: 10,
        alignItems: "center",
        alignContent: "center",
        justifyContent:'center',
        paddingTop: 20,
      },
      checkbox: {
        width: 20,
        height: 20,
      },
      proceedButton: {
        justifyContent: "center",
        alignSelf: "center",
        paddingVertical: 12,
        borderRadius: 10,
        width: "100%",
        
      },
      subtitle: {
        alignSelf: "center",
        fontSize: 18,
    
        letterSpacing: 0.25,
        color: "white",
      },
});
