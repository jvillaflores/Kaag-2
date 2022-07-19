import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { NavigationContainer } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Audio } from "expo-av";

var head = require("../../assets/learning.svg");

const Word = ({ route }) => {
  const { data } = route?.params ?? {};

  const downloadAudio = async () => {
    //function for playing the audio of the dictionary data
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

  return (
    <ScrollView>
      <View style={styles.headLine}>
        <View style={styles.header_line}>
          <Text style={styles.inKagan}> {data?.word} </Text>
          <Text style={styles.inPronounciation}> /{data?.pronunciation}/ </Text>

          <TouchableOpacity
            style={styles.buttonAudio}
            onPress={() => downloadAudio()}
          >
            <View>
              <MaterialCommunityIcons
                name="volume-high"
                size={26}
                color="white"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        <View style={{ paddingVertical: 8 }}>
          <Text style={styles.boldText}>Definition </Text>
          <Text style={styles.contextText}>{data?.meaning} </Text>
        </View>
        <View style={{ paddingVertical: 8 }}>
          <Text style={styles.boldText}>Additional Information </Text>
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={{ color: "#215a88" }}>Translation in Filipino</Text>
            <Text style={[styles.contextText]}>{data?.filipino} </Text>
            <Text style={{ color: "#215a88" }}>Definition</Text>
            <Text style={[styles.contextText]}>{data?.sentence}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Word;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    top: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headLine: {
    flexDirection: "column",
    width: "100%",
    height: 150,
    backgroundColor: "#215a88",
  },
  header_line: {
    flexDirection: "column",
    paddingVertical: 5,
    //padding: 30,
    //top: 20,
    //height: 150,
    alignItems: "center",
    //justifyContent: "center",
  },
  inKagan: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
  inPronounciation: {
    color: "white",
  },
  buttonAudio: {
    alignSelf: "center",
    padding: 8,
    margin: 10,
    borderRadius: 7,
    backgroundColor: "#91b2eb",
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  contextText: {
    paddingHorizontal: 10,
  },
});
