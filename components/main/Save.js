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
import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useValidation } from "react-native-form-validator";
import { FloatingLabelInput } from "react-native-floating-label-input";

function Save({ currentUser, route, navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(null);
  const { language } = route?.params ?? {};
  console.log(language);

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: { title, description },
    });

  const onSubmit = () => {
    validate({
      title: { required: true },
      description: { required: true },
    });
    uploadImage();
  };
  const uploadImage = async () => {
    const uri = route.params.image;
    const childPath = `posts/${
      firebase.auth().currentUser.uid
    }/${language}/${Math.random().toString(36)}`;
    console.log(childPath);
    const response = await fetch(uri);
    const blob = await response.blob();

    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      setLoading((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
        saveAllPostData(snapshot);
        setLoading(null);
        console.log(snapshot);
      });
    };

    const taskError = (snapshot) => {
      console.log(snapshot);
      setLoading(null);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const saveAllPostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("languages")
      .doc(language)
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        uid: firebase.auth().currentUser.uid,
        username: currentUser.name,
        userImage: currentUser.userImage,
        downloadURL,
        title,
        description,
        tags,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        alert("Image Posted");
        setLoading(null);
        navigation.navigate("Community", { language: language });
      });
  };
  const savePostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("languages")
      .doc(language)
      .collection("posts")
      .add({
        uid: firebase.auth().currentUser.uid,
        username: currentUser.name,
        userImage: currentUser.userImage,
        downloadURL,
        title,
        description,
        tags,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        alert("Image Posted");
        setLoading(null);
        navigation.navigate("Community", { language: language });
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image source={{ uri: route.params.image }} />
      </View>

      <View style={styles.bodycontainer}>
        <View style={{ marginVertical: 10 }}>
          <Text style={[styles.text, { fontSize: 16 }]}>Title </Text>
          <Text
            style={[styles.textItalized, { fontSize: 14, color: "#707070" }]}
          >
            {" "}
            Type the title of your image.
          </Text>
          {isFieldInError("title") &&
            getErrorsInField("title").map((errorMessage) => (
              <Text style={{ color: "red" }}>Required</Text>
            ))}
          <TextInput
            style={[styles.addButton, { height: 50 }]}
            multiline={true}
            autoCorrect={false}
            onChangeText={(title) => setTitle(title)}
            maxLength={25}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={[styles.text, { fontSize: 16 }]}>Description </Text>
          <Text
            style={[styles.textItalized, { fontSize: 14, color: "#707070" }]}
          >
            Describe the image you have added.
          </Text>
          {isFieldInError("description") &&
            getErrorsInField("description").map((errorMessage) => (
              <Text style={{ color: "red" }}>Required</Text>
            ))}
          <FloatingLabelInput
            value={description}
            blurOnSubmit={false}
            countdownLabel="chars left"
            multiline={true}
            autoCorrect={false}
            onChangeText={(description) => setDescription(description)}
            maxLength={95}
            showCountdown={true}
            color="black"
            containerStyles={{
              borderWidth: 1,
              paddingHorizontal: 10,
              borderColor: "#70707033",
              borderRadius: 5,
              marginVertical: 10,
            }}
            inputStyles={{
              flex: 1,
              letterSpacing: 0.25,
              height: 80,
              width: "95%",
              paddingTop: 1,
              marginTop: 10,
              borderRadius: 5,
              color: "black",
            }}
            showCountdownStyles={{
              color: "#707070",
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
            marginVertical: 10,
          }}
        >
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#215A88" }]}
            onPress={() => onSubmit()}
          >
            <Text style={[styles.subtitle, { fontSize: 16, color: "white" }]}>
              {loading ? `Sharing...  ${parseInt(loading)}%` : "Share"}
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

export default connect(mapStateToProps, null)(Save);
const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    top: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  subtitle: {
    alignSelf: "center",
    fontSize: 18,

    letterSpacing: 0.25,
    color: "white",
  },
  text: {
    fontWeight: "bold",
    fontSize: 10,
  },
  textItalized: {
    fontStyle: "italic",
    fontSize: 18,
  },
  bodycontainer: {
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  addButton: {
    borderColor: "#70707033",
    borderWidth: 1.5,
    marginVertical: 10,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  button: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 5,
  },
});
