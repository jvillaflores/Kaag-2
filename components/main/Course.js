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

return(
  <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
          <View >
            <Text style={[styles.textHead]}>Hello, {currentUser.name}! </Text>
          </View>


        {/* Kagan courses options. */}
        <View style={styles.Vertical}>
          <View>
            <Text style={styles.textKagan}>{language} Course</Text>
          </View>

          <View style={styles.Row}>
          {/* Vocabulary.js */}
          <TouchableOpacity
            style={styles.buttonVocab}
            onPress={() =>
              navigation.navigate("Vocabulary", { language: language })
              //alert("This page is not yet available")
            }
          >
            <View style={styles.contextButton}>
              <Image
                style={{ width: 70, height: 70, margin: 20 }}
                source={require("../../assets/image-v.png")}
              />

              <View style={styles.text_Context}>
                <Text style={styles.textVocab}>Vocabulary</Text>
                <Text style={styles.textVocabSub}>Translate words</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Speech.js */}
          <TouchableOpacity
            style={styles.buttonVocab}
            onPress={() => 
              navigation.navigate("SpeechQuiz", { language: language })
             
            }
          >
            <View style={styles.contextButton}>
              
                  <Image
                  style={{ width: 70, height: 70, margin: 20 }}
                  source={require("../../assets/speech.png")}
                />
              
              <View style={styles.text_Context}>
                <Text style={styles.textVocab}>Speech</Text>
                <Text style={styles.textVocabSub}>
                  Select the correct pronunciation
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          </View>
        </View>


        
        

        <View style={styles.Vertical}>
              {/* Images Course text */}
              <View style={{ paddingTop: 10, paddingVertical: 5 }}>
                <Text style={styles.textKagan}>About {language}</Text>
              </View>

              {/* About Kagan options. */}
              <View style={styles.Row}>
                {/* AboutCulture.js */}
                <TouchableOpacity
                  style={styles.buttonVocab}
                  onPress={() => navigation.navigate("Traditions", { language: language })}
                >
                  <View style={styles.contextButton}>
                      <Image
                        style={{ width: 70, height: 70, margin: 20 }}
                        source={require("../../assets/imag.png")}
                      />

                      <View style={styles.text_Context}>
                            <Text style={styles.textVocab}>Images</Text>
                            <Text style={styles.textVocabSub}>About the Culture</Text>
                      </View>
                  </View>
                </TouchableOpacity>

                {/* AboutEvents.js */}
                <TouchableOpacity
                  style={styles.buttonVocab}
                  onPress={() => navigation.navigate("Event", { language: language })}
                >
                      <View style={styles.contextButton}>
                              <Image
                                style={{ width: 70, height: 70, margin: 20 }}
                                source={require("../../assets/more.png")}
                              />

                        <View style={styles.text_Context}>
                              <Text style={styles.textVocab}>More</Text>
                              <Text style={styles.textVocabSub}>About the Culture</Text>
                        </View>
                      </View>
                </TouchableOpacity>
         
              </View>
        </View>
      </ScrollView>
    </SafeAreaView>
)
}
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(Course);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    alignContent: "center",
    marginTop: 25,
  },
  scrollView: {
    marginHorizontal: 15,
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
  Row:{
    flexDirection:'row',
    paddingVertical:4,
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
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    paddingVertical: 15,
    marginHorizontal: 15,
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
    fontSize: 16,
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
  Vertical:{
    paddingVertical: 5,
    paddingHorizontal: 15,
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
    color: "black",
  },
  textVocabSub: {
    fontSize: 11,
    letterSpacing: 0.25,
    color: "grey",
    textAlign:'center',
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
  },
});
