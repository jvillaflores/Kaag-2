import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

const OptionQuiz = ({ navigation, route }) => {
  const { language } = route?.params ?? {};
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingBottom: 30, flexDirection:"row" }}>
          {/* EditCulture.js */}
          <TouchableOpacity
            style={styles.buttonVocab}
            onPress={() =>
              navigation.navigate("AddQuestion", { language: language })
            }
          >
            <View style={styles.contextButton}>
              <Image
                style={{ width: 70, height: 70, margin: 20 }}
                source={require("../../../assets/image-v.png")}
              />

              <View style={styles.text_Context}>
                <Text style={styles.textVocab}>Vocabulary</Text>
                <Text style={styles.textVocabSub}>About the Culture</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* AboutCulture.js */}
          <TouchableOpacity
            style={styles.buttonVocab}
            onPress={() =>
              navigation.navigate("SpeechAddQuiz", { language: language })
            }
          >
            <View style={styles.contextButton}>
              <Image
                style={{ width: 70, height: 70, margin: 20 }}
                source={require("../../../assets/speech.png")}
              />

              <View style={styles.text_Context}>
                <Text style={styles.textVocab}>Speech</Text>
                <Text style={styles.textVocabSub}>About the Culture</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OptionQuiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    alignContent: "center",
    marginTop: 25,
  },
  scrollView: {
    paddingHorizontal: 15,
  },
  containerbox: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  header: {
    alignContent: "flex-start",
    alignSelf: "flex-start",
    marginLeft: 50,
    marginTop: 15,
  },
  inKagan: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.3,
  },
  headline_box: {
    backgroundColor: "#EBEBEB",
    alignItems: "center",
    borderRadius: 15,
    marginVertical: 10,
  },
  contextButton: {
    flexDirection: "column",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  text_Context: {
    flexDirection: "column",
    alignItems: "center",
  },
  textHead: {
    flexDirection: "row",
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
    paddingVertical: 15,
  },
  textSubHead: {
    flexDirection: "row",
    fontSize: 13,
    // fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "grey",
  },
  headLine: {
    top: 15,
    left: 10,
  },
  textHeadline: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    padding: 15,
    marginBottom: -30,
  },

  grammar: {
    top: 70,
    left: 40,
  },
  pronun: {
    top: 100,
    left: 40,
  },
  textKagan: {
    flexDirection: "row",
    fontSize: 26,
    fontWeight: "bold",
    //lineHeight: 21,
    letterSpacing: 0.5,
    color: "black",
  },
  button: {
    justifyContent: "center",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    margin: 10,
    backgroundColor: "#8E2835",
  },
  buttonVocab: {
    width: "47.5%",
    elevation: 0.7,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingVertical: 15,
    margin: 5,
  },
  buttonGrammar: {
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    width: "78%",
    backgroundColor: "#dadada",
    top: 60,
    left: -40,
    height: 60,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    borderColor: "black",
  },
  buttonPronun: {
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    width: "78%",
    backgroundColor: "#dadada",
    top: 60,
    left: -40,
    height: 60,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    borderColor: "black",
  },
  Vocab: {
    top: -20,
    left: 40,
  },
  VocabSub: {
    top: -22,
    left: 40,
  },
  textVocab: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
  },
  textVocabSub: {
    fontSize: 11,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "grey",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
  },
});
