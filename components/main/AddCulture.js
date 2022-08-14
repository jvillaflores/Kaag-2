import React, { useState, useEffect } from "react";
import {
  View,
  
  Image,
  Button,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import {
  TextInput,
} from 'react-native-paper'
import { connect } from "react-redux";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");
import "firebase/firestore";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

const AddCulture = ({ navigation, route }) => {
  const { language } = route.params;

  console.log(language);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [credits, setCredits] = useState("");

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [loading, setLoading] = useState(null);

  const submit = async () => {
    uploadImage();
  };

  const saveUserData = (downloadURL) => {
    return firebase
      .firestore()
      .collection("languages")
      .doc(language)
      .collection("Culture")
      .add({
        title,
        credits,
        desc,
        image: downloadURL,
      })

      .then(() => {
        alert("Culture Successfully Added");
        navigation.popToTop();
      });
  };

  const uploadImage = async () => {
    const uri = image;
    const childPath = `about/${
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
        saveUserData(snapshot);
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

  useEffect(() => {
    //ask permission for user to gain access using camera and
    //gain access in phones library
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);

      setImage(data.uri);
    }
  };

  const pickImage = async () => {
    //Function to select and image in the library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    // <ScrollView style={styles.container}>
    //   <View style={styles.bodycontainer}>
    //     <View style={{ marginVertical: 15 }}>
    //     <View style={styles.centered_Buttons}>
    //         <TouchableOpacity
    //           style={styles.ChooseImageButton}
    //           title="Pick Image From Gallery"
    //           onPress={(onPress) => pickImage()}
    //         >
    //           <MaterialCommunityIcons
    //             name="image-multiple"
    //             color="#263238"
    //             size={50}
    //           />
    //         </TouchableOpacity>
    //   </View>

    //   {image && (
    //     <Image
    //       source={{ uri: image }}
    //       style={{ bottom: 100, aspectRatio: 1 }}
    //     />
    //   )}
    //       <View>
    //         <Text style={[styles.text, { color: "#000000" }]}>Title</Text>
    //       </View>
    //     </View>

    //     <View>
    //       <TextInput
    //         style={styles.input}
    //         multiline={true}
    //         autoCapitalize="none"
    //         onChangeText={(title) => setTitle(title)}
    //       />
    //       <Text style={[styles.text, { fontSize: 16 }]}>Credits</Text>
    //       <TextInput
    //         style={styles.input}
    //         multiline={true}
    //         autoCapitalize="none"
    //         onChangeText={(credits) => setCredits(credits)}
    //       />
    //     </View>
    //     <View>
    //       <Text style={[styles.text, { fontSize: 16 }]}>About</Text>
    //       <Text style={[styles.guidelines]}>
    //         Brief introduction/description about the language.
    //       </Text>
    //       <TextInput
    //         multiline={true}
    //         style={[
    //           styles.addButton,
    //           { height: 180 },
    //           { paddingHorizontal: 10, flexDirection: "row" },
    //         ]}
    //         onChangeText={(desc) => setDesc(desc)}
    //       ></TextInput>
    //     </View>
    //     <View
    //       style={{
    //         flexDirection: "row",
    //         flex: 1,
    //         justifyContent: "center",
    //         marginVertical: 25,
    //       }}
    //     >
    //       <TouchableOpacity
    //         style={[styles.button, { backgroundColor: "#215a88" }]}
    //         onPress={() => submit()}
    //       >
    //         <Text style={[styles.text, { fontSize: 16, color: "white" }]}>
    //           Submit
    //         </Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </ScrollView>
    <ScrollView style={styles.container}>
          <View>
            <View style={{alignItems:"center"}}>
                <TouchableOpacity
                    style={styles.ChooseImageButton}
                    title="Pick Image From Gallery"
                    onPress={(onPress) => pickImage()}
                >
                  <MaterialCommunityIcons
                    name="image-multiple"
                    color="#707070"
                    size={50}
                  />
                </TouchableOpacity>
            </View>
                {image && (
                <Image
                  source={{ uri: image }}
                  style={{ bottom: 100, aspectRatio: 1 }}
                />
                )}
        </View>
        <View>
            <View style={{paddingVertical:5}}>
                <Text style={[styles.text, { color: "#000000" }]}>Title</Text>
                <TextInput
                  style={styles.input}
                  multiline={true}
                  autoCapitalize="none"
                  onChangeText={(title) => setTitle(title)}
                />
            </View>
            <View style={{paddingVertical:5}}>
                <Text style={[styles.text, { fontSize: 16 }]}>Credits</Text>
                <TextInput
                  style={styles.input}
                  multiline={true}
                  autoCapitalize="none"
                  onChangeText={(credits) => setCredits(credits)}
                />
            </View>
            <View style={{paddingVertical:5}}>
                <Text style={[styles.text, { fontSize: 16 }]}>About</Text>
                <Text style={[styles.guidelines]}>
                  Brief introduction/description about the language.
                </Text>
                <TextInput
                  multiline={true}
                  style={[
                    { paddingHorizontal: 10, flexDirection: "row" },
                  ]}
                  onChangeText={(desc) => setDesc(desc)}
                >
                  
                </TextInput>
            </View>

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
            style={[styles.button, { backgroundColor: "#215a88" }]}
            onPress={() => submit()}
          >
            <Text style={[styles.text, { fontSize: 16, color: "white" }]}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
        

             
        

    </ScrollView>
  );
};

export default AddCulture;
const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  input: {
    letterSpacing: 0.25,
    height: 50,
    width: "100%",

  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical:4,
  },
  bodycontainer: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  button: {
    flex: 1,
    borderRadius: 5,
    alignItems: "center",
    paddingVertical: 15,
  },
  buttonss: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 10,
    shadowColor: "#F02A4B",
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 },
    backgroundColor: "#91B2EB",
    bottom: 0,
    right: 0,
    elevation: 9,
  },
  guidelines: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#707070",
  },
  ChooseImageButton:{
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#e7e7e7",
    borderRadius: 6,
    height: 100,
    borderColor: "#707070",
    paddingTop: 10,
    marginTop: 20,
  }
});
