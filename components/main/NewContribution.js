import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import UploadList from "./UploadList";
import UploadItem from "./UploadItem";

export default function Contribution({ navigation, route }) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const { language } = route?.params ?? {};
  const [uploadModal, setUploadModal] = useState(false);
  console.log(language);
  const closeUploadModal = () => {
    setUploadModal(false);
  };

  //const { width: winWidth, height: winHeight } = Dimensions.get('window');

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (granted) {
      setUploadModal(false);
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,

        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        //let newImages = [data, ...images];
        setImage(data);
        //setImage(newImages);
      }
    } else {
      Alert.alert("Camera Permission Needed");
    }
  };

  const handleAddPhoto = () => {
    setUploadModal(true);
  };

  const pickImage = async () => {
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
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.upload}>
        <TextInput
          style={styles.text}
          multiline={true}
          autoCorrect={false}
          blurOnSubmit={true}
          placeholder="What's happening?"
        />

        <View style={{ marginVertical: 10, flex: 1 }}>
          {image && <UploadItem item={image} />}
        </View>

        {image && (
          <TouchableOpacity
            //style={styles.cart__checkoutButton}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("UploadSuccess")}
          >
            <Text>Confirm</Text>
          </TouchableOpacity>
        )}

        {!image && (
          <View>
            <TouchableOpacity
              style={{
                ...styles.upload__containerInsideCol,
                borderRightColor: "lightgray",
                borderRightWidth: 1,
              }}
              onPress={takePicture}
            >
              <MaterialCommunityIcons name="camera" color="#8E2835" size={32} />
              <Text style={styles.buttontext}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.upload__containerInsideCol}
              onPress={pickImage}
            >
              <MaterialCommunityIcons name="image" color="#8E2835" size={32} />
              <Text style={styles.buttontext}>Gallery</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    //backgroundColor: 'white'
  },
  cameraButton: {
    position: "absolute",
    bottom: 30,
    width: 80,
    height: 80,
    borderRadius: 20,
    borderColor: "#8E2835",
    borderWidth: 3,
    alignSelf: "center",
  },
  buttontext: {
    color: "#8E2835",
    fontSize: 15,
  },
  center: {
    position: "absolute",
    alignSelf: "center",
    top: 12.5,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  upload: {
    flex: 1,
  },
  upload__indicator: {
    flex: 1,
  },
  upload__indicatorTitle: {
    flex: 1,
  },
  upload__indicatorSemiTitle: {
    flex: 1,
  },
  upload__containerOutside: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "16%",
    backgroundColor: "#F2F2F2",
    flexDirection: "row",
    alignSelf: "center",
    borderTopEndRadius: 25,
    borderTopLeftRadius: 25,
    shadowColor: "#8E2835",
  },
  upload__containerInside: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  upload__containerInsideCol: {
    margin: 5,

    alignItems: "center",
    width: 100,
    height: 80,
    borderRadius: 20,
    borderColor: "#8E2835",
    borderWidth: 3,
    justifyContent: "center",
  },
  camerafixedRatio: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: "#fff",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  capture: {
    position: "absolute",
    bottom: 30,
    width: 80,
    height: 80,
    borderRadius: 100,
    borderColor: "#eee",
    borderWidth: 6,
    alignSelf: "center",
  },
  Flipbutton: {
    position: "absolute",
    alignSelf: "flex-end",
    justifyContent: "center",
    borderRadius: 4,
    elevation: 3,
    right: 25,
    top: 15,
  },
  ChooseImageButton: {
    position: "absolute",
    bottom: 10,
    width: 80,
    height: 80,
    alignSelf: "flex-end",
  },

  loginGroup: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    top: -50,
    left: 30,
  },
  input: {
    height: 45,
    width: "80%",
    margin: 12,
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  input1: {
    height: 100,
    width: "80%",
    margin: 12,
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textGrey: {
    fontSize: 15,
    color: "grey",
    fontWeight: "bold",
    left: 50,
  },
  button1: {
    marginBottom: 200,
  },

  text: {
    fontSize: 20,
    fontWeight: "normal",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
    padding: 15,
    margin: 12,
  },
  text1: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
  },
});
