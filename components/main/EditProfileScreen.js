import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Image,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { useValidation } from "react-native-form-validator";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");
import { connect } from "react-redux";

//FUNCTION CURRENTLY NOT ACTIVE
const EditProfileScreen = ({ currentUser, navigation }) => {
  const [image, setImage] = useState(null);
  const [fullname, setFullName] = useState("");
  const [loading, setLoading] = useState(null);

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: { fullname },
    });

  const pickImage = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(image);

    if (!image.cancelled) {
      setImage(image.uri);
    }
  };

  const onReset = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(`${currentUser.email}`)
      .then(function (user) {
        alert("Please check your email...");
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  const uploadImage = async () => {
    const uri = image;
    const childPath = `userpictures/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;
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
        setLoading(null);
        console.log(snapshot);
      });
    };

    const taskError = (snapshot) => {
      setLoading(null);
      console.log(snapshot);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };
  const savePostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        userImage: downloadURL,
      })
      .then(function () {
        alert("Profile edited! ");
        navigation.popToTop();
        setLoading(null);
        alert(
          "Profile photo might not yet be available after, please restart application if it occurs. Thank you!"
        );
      });
  };

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.commandButton} onPressOut={pickImage}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.commandButton}
        onPressOut={() => bs.current.snapTo(1)}
      >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const bs = React.createRef();
  const fall = new Animated.Value(1);

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bs}
        snapPoints={[370, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}
      >
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={{ uri: image }}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 15 }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: "#fff",
                      borderRadius: 10,
                      position: "absolute",
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>

          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
            {currentUser.name}
          </Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} />
          <TextInput
            placeholder={currentUser.name}
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCorrect={false}
            editable={false}
            onChangeText={(fullname) => setFullName(fullname)}
          />
          {isFieldInError("fullname") &&
            getErrorsInField("fullname").map((errorMessage) => (
              <Text style={{ color: "red" }}>
                Please enter your Full Name to complete the submission.
              </Text>
            ))}
        </View>
        <View style={styles.action}>
          <FontAwesome name="at" size={20} />
          <TextInput
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCorrect={false}
            keyboardType="email-address"
            placeholder={currentUser.email}
            editable={false}
          />
        </View>
        <TouchableOpacity
          style={styles.commandButton}
          onPress={() => uploadImage()}
        >
          <Text style={styles.panelButtonTitle}>
            {loading ? `Submitting...  ${parseInt(loading)}%` : "Submit"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.commandButton}
          onPress={() => onReset()}
        >
          <Text style={styles.panelButtonTitle}>Reset Password</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(EditProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 20,
  },
  textInput: {
    flex: 1,
    letterSpacing: 0.25,
    paddingLeft: 12,
  },
  action: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#8E2835",
    alignItems: "center",
    marginTop: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },

  panel: {
    padding: 20,
    backgroundColor: "#ffffff",
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },

  panelTitle: {
    fontSize: 27,
    height: 35,
  },

  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },

  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
});
