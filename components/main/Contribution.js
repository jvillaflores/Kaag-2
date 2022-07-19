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
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Contribution({ navigation, route }) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  // const [cameraRef, setCameraRef] = useState(null)
  // const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
  // const [cameraFlash, setCameraFlash] = useState(Camera.Constants.FlashMode.off)
  const [isCameraReady, setIsCameraReady] = useState(false);
  const { language } = route?.params ?? {};

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
    // if (camera) {
    //   const data = await ImagePicker.launchCameraAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   })
    //   setImage(data.uri);
    // }
    //Function for camera to take picture
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
    <View style={{ flex: 1 }}>
      {!image && (
        <View style={styles.cameraContainer}>
          <Camera
            ref={(ref) => setCamera(ref)}
            style={styles.fixedRatio}
            type={type}
            ratio={"1:1"}
            onCameraReady={() => setIsCameraReady(true)}
          />

          <View style={styles.button1}>
            <TouchableOpacity
              style={styles.flipCam}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <MaterialCommunityIcons
                name="camera-party-mode"
                color="#ffffff"
                size={32}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.centered_Buttons}>
        <TouchableOpacity
          style={styles.capture}
          title="Take Picture"
          onPress={() => takePicture()}
        />
        <TouchableOpacity
          style={styles.ChooseImageButton}
          title="Pick Image From Gallery"
          onPress={(onPress) => pickImage()}
        >
          <MaterialCommunityIcons
            name="image-multiple"
            color="#263238"
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
      <View style={{ alignItems: "center" }}>
        {image && (
          <TouchableOpacity
            //title="Save"
            style={styles.checkButton}
            onPress={() =>
              navigation.navigate("Save", { image, language: language })
            }
          >
            <MaterialCommunityIcons name="check" color="#263238" size={100} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  capture: {
    //position: "relative",
    //bottom: 100,
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "#263238",
    borderWidth: 6,
    alignSelf: "center",
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  ChooseImageButton: {
    position: "absolute",
    //bottom: 100,
    width: 80,
    height: 80,
    alignSelf: "flex-end",
    paddingTop: 20,
    right: 20,
  },
  centered_Buttons: {
    position: "relative",
    bottom: 100,
    //flexDirection: 'row',
    justifyContent: "center",
  },
  flipCam: {
    alignContent: "center",
    left: 330,
    alignSelf: "flex-end",
  },
  cameraButtons: {
    position: "relative",
    //flex: 1,
    flexDirection: "row",
    marginBottom: 20,
    alignContent: "center",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  checkButton: {
    alignItems: "center",
    borderWidth: 3,
    borderRadius: 100,
    borderColor: "#263238",
    borderWidth: 6,
    width: 120,
    height: 120,
  },
  container: {
    flex: 1,
    height: 20,
    width: "100%",
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
    //marginBottom: 200,
    position: "absolute",
    //alignSelf: "flex-end",
    padding: 20,
  },
  button: {
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    left: -25,
    width: "80%",
    backgroundColor: "#8E2835",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },

  text: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
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
