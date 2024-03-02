import React, {useEffect} from "react";
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
  const soundObject = new Audio.Sound();
  const downloadAudio = async () => {
    //function for playing the audio of the dictionary data
    // let SoundObject = new Audio.Sound();
    // try {
    //   await SoundObject.loadAsync({ uri: data.downloadURL });
    //   const status = await SoundObject.playAsync();
    //   setTimeout(() => {
    //     SoundObject.unloadAsync();
    //   }, status.playableDurationMillis + 1000);
    // } catch (error) {
    //   console.log(error);
    //   await SoundObject.unloadAsync(); // Unload any sound loaded
    //   SoundObject.setOnPlaybackStatusUpdate(null); // Unset all playback status loaded
    //   retryPlaySound();
    // }
    
  };
 
    const playSoundWithDelay = async () => {
      // Create a new instance of Audio.Sound

      try {
        // Load the sound file (replace 'soundfile.mp3' with your actual sound file)
        const unload = await soundObject.unloadAsync();
        await soundObject.loadAsync({uri:data.downloadURL});
  
        // Set the delay (in milliseconds) before playing the sound (e.g., 2000ms for 2 seconds)
        const delayMillis = 2000;
  
        // Wait for the specified delay before playing the sound
        await new Promise(resolve => setTimeout(resolve, delayMillis));
  
        // Play the loaded sound
        await soundObject.playAsync();

       
      } catch (error) {
        console.error('Error loading or playing the sound', error);
      }
    };
  
    useEffect(() => {
      // Clean up the audio player when the component unmounts
      return () => {
        soundObject.unloadAsync();
      };
    }, []);
  
  
    
  

  const retryPlaySound = () => downloadAudio();

  return (
    <ScrollView>
      <View style={styles.headLine}>
        <View style={styles.header_line}>
          <Text style={styles.inKagan}> {data?.word} </Text>
          <Text style={styles.inPronounciation}> {data?.pronunciation} </Text>
          
          <TouchableOpacity
            style={styles.buttonAudio}
            onPress={() => playSoundWithDelay()}
          >
            <View>
              <MaterialCommunityIcons
                name="volume-high"
                size={26}
                color="#215a88"
              />
            </View>
          </TouchableOpacity>
          <Text style={[styles.classy]}>{data?.classification} </Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={{ paddingVertical: 8 }}>
        <Text style={[styles.classy]}> </Text>
          <Text style={styles.boldText}>Definition in Cebuano</Text>
          <Text style={styles.contextText}>{data?.meaning} </Text>
        </View>
        <View style={{ paddingVertical: 8 }}>
          <Text style={styles.boldText}>Additional Information </Text>
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={{ color: "#215a88" }}>Definition in Filipino</Text>
            <Text style={[styles.contextText]}>{data?.filipino} </Text>
            <Text style={{ color: "#215a88" }}>Definition in English</Text>
            <Text style={[styles.contextText]}>{data?.englishMeaning}</Text>
            <Text style={{ color: "#215a88" }}>Origin</Text>
            
            {data?.gathered == 1 ? (
                <Text style={[styles.contextText]}> Data collected from the community.</Text>
              ) : null}
              {data?.gathered == 0 ? (
            <Text style={[styles.contextText]}>{data?.originated}</Text>
              ) : null}
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
  classy:{
    alignContent:'center',
    //paddingVertical: 10
    color:"white"
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
    backgroundColor: "white",
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  contextText: {
    paddingHorizontal: 10,
  },
});
