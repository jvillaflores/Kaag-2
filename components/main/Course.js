import React from "react";
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
} from "react-native";

import Svg, { Path, G, Rect, Polygon, Title } from "react-native-svg";
import { connect } from "react-redux";

function Course({ currentUser, navigation, language }) {
  console.log(language);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={[styles.textHead, {}]}>Hello, {currentUser.name}! </Text>
        </View>

        <View>
          <Text style={styles.textKagan}>Course</Text>
        </View>

        {/* Kagan courses options. */}
        <View>
          {/* Vocabulary.js */}
          <TouchableOpacity
            style={styles.buttonVocab}
            onPress={() =>
              navigation.navigate("Testpage", { language: language })
            }
          >
            <View style={styles.contextButton}>
              <Image
                style={{ width: 30, height: 40 }}
                source={require("../../assets/vocab.png")}
              />

              <View style={styles.text_Context}>
                <Text style={styles.textVocab}> Vocabulary</Text>
                <Text style={styles.textVocabSub}> Translate words</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Speech.js */}
          <TouchableOpacity
            style={styles.buttonVocab}
            onPress={() => navigation.navigate("Speech")}
          >
            <View style={styles.contextButton}>
              <Image
                style={{ width: 50, height: 40 }}
                source={require("../../assets/pronun.png")}
              />
              <View style={styles.text_Context}>
                <Text style={styles.textVocab}> Speech</Text>
                <Text style={styles.textVocabSub}>
                  {" "}
                  Select the correct pronunciation
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Images Course text */}
        <View style={{ paddingTop: 10, paddingVertical: 5 }}>
          <Text style={styles.textKagan}>About</Text>
        </View>

        {/* About Kagan options. */}
        <View style={{ paddingBottom: 30 }}>
          {/* AboutCulture.js */}
          <TouchableOpacity
            style={styles.buttonVocab}
            onPress={() => navigation.navigate("Traditions", { language: language })}
          >
            <View style={styles.contextButton}>
              <Image
                style={{ width: 40, height: 40 }}
                source={require("../../assets/images.png")}
              />

              <View style={styles.text_Context}>
                <Text style={styles.textVocab}>Images</Text>
                <Text style={styles.textVocabSub}>About the Culture</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* AboutCulture.js */}
          <TouchableOpacity
            style={styles.buttonVocab}
            onPress={() => navigation.navigate("Event", { language: language })}
          >
            <View style={styles.contextButton}>
              <Image
                style={{ width: 40, height: 40 }}
                source={require("../../assets/book.png")}
              />

              <View style={styles.text_Context}>
                <Text style={styles.textVocab}>More</Text>
                <Text style={styles.textVocabSub}>About the Culture</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(Course);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    // paddingHorizontal: 40,
    //paddingVertical: 30,
    alignContent: "center",
    marginTop: 25,
  },
  scrollView: {
    marginHorizontal: 40,
    //paddingVertical: 30
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
  headline_box: {
    backgroundColor: "#EBEBEB",
    alignItems: "center",
    borderRadius: 15,
    marginVertical: 10,
  },
  contextButton: {
    //padding: 13,
    flexDirection: "row",
    paddingHorizontal: 35,
    alignItems: "center",
  },
  text_Context: {
    flexDirection: "column",
    marginLeft: 20,
    alignItems: "flex-start",
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
    width: "100%",
    //alignSelf: "center",
    //alignItems: "flex-start",
    //marginTop: 10,
    elevation: 0.7,
    //width: 300,
    backgroundColor: "#EBEBEB",
    borderRadius: 10,
    paddingVertical: 15,
    marginVertical: 5,
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
