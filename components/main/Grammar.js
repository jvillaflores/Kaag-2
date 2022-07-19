import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity
} from "react-native";

const Grammar = ({ route, navigation }) => {
  return (
    <View style={styles.Kagan}>
      <Text style={styles.textKagan}> Courses </Text>

      <View>
        <TouchableOpacity
          style={styles.buttonVocab}
          onPress={() => navigation.navigate("Phrases1")}
        >
          <View style={styles.contextButton}>
            <Image
              style={{ width: 60, height: 60 }}
              source={require("../../assets/Learning-cuate.png")}
            />
            <View style={styles.text_Context}>
              <Text style={styles.textVocab}>Greetings</Text>
              <Text style={styles.textVocabSub}>7 phrases </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          style={styles.buttonVocab}
          onPress={() => navigation.navigate("Phrases2")}
        >
          <View style={styles.contextButton}>
            <Image
              style={{ width: 60, height: 60 }}
              source={require("../../assets/Learning-cuate.png")}
            />
            <View style={styles.text_Context}>
              <Text style={styles.textVocab}>Introduction</Text>
              <Text style={styles.textVocabSub}>3 phrases</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          style={styles.buttonVocab}
          onPress={() => navigation.navigate("Phrases3")}
        >
          <View style={styles.contextButton}>
            <Image
              style={{ width: 60, height: 60 }}
              source={require("../../assets/Learning-cuate.png")}
            />
            <View style={styles.text_Context}>
              <Text style={styles.textVocab}>Conversation</Text>
              <Text style={styles.textVocabSub}>10 phrases</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Grammar;

const styles = StyleSheet.create({
  header: {
    top: 40,
    left: 30,
  },
  headline: {
    width: "78%",
    height: 200,
    backgroundColor: "#dadada",
    top: 70,
    left: 40,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  contextButton: {
    padding: 20,
    flexDirection: "row",
    left: 20,
    alignItems: "center",
  },
  text_Context: {
    flexDirection: "column",
    marginLeft: 30,
  },
  buttonVocab: {
    alignSelf: "center",
    alignItems: "flex-start",
    marginTop: 10,
    elevation: 0.7,
    width: 300,
    // paddingLeft:35,
    // paddingRight:35,
    backgroundColor: "#EBEBEB",
    left: -24,
    borderRadius: 10,
  },
  textKagan: {
    flexDirection: "row",
    fontSize: 25,
    fontWeight: "bold",
    //lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
    alignSelf: "flex-start",
  },
  textHead: {
    flexDirection: "row",
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
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
    flexDirection: "row",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
  },
  Kagan: {
    top: 20,
    left: 20,
    alignItems: "center",
  },
  grammar: {
    top: 10,
    left: 40,
  },
  pronun: {
    top: 40,
    left: 40,
  },
  shit: {
    top: 30,
  },
  shit1: {
    top: 60,
  },

  button: {
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    width: 150,
    top: -120,
    backgroundColor: "#8E2835",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
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
    height: 80,
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
    height: 80,
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
    fontSize: 18,
    fontWeight: "bold",
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
