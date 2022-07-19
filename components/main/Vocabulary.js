import React from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableOpacity,
    ScrollView,
    Touchable
   } from "react-native";

const Vocabulary = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
        <Text style={styles.textKagan}>Courses </Text>

        <View style = {{paddingVertical:5}}>
            <TouchableOpacity
              style={styles.buttonVocab}
              onPress={() => navigation.navigate("Vocabulary1")}
            >
              <View style={styles.contextButton}>
                <Image
                  style={{ width: 60, height: 60 }}
                  source={require("../../assets/Learning-cuate.png")}
                />
                <View style={styles.text_Context}>
                  <Text style={styles.textVocab}>Pronouns</Text>
                  <Text style={styles.textVocabSub}>Translate the words</Text>
                </View>
              </View>
            </TouchableOpacity>

        </View>

        <View style = {{paddingVertical:5}}>
            <TouchableOpacity
              style={styles.buttonVocab}
              onPress={() => navigation.navigate("Vocabulary2")}
            >
              <View style={styles.contextButton}>
                <Image
                  style={{ width: 60, height: 60 }}
                  source={require("../../assets/Learning-cuate.png")}
                />
                <View style={styles.text_Context}>
                  <Text style={styles.textVocab}>Adjective</Text>
                  <Text style={styles.textVocabSub}>Translate the words</Text>
                </View>
              </View>
            </TouchableOpacity>
        </View>

        <View style = {{paddingVertical:5}}>
            <TouchableOpacity
              style={styles.buttonVocab}
              onPress={() => navigation.navigate("Vocabulary3")}
            >
              <View style={styles.contextButton}>
                <Image
                  style={{ width: 60, height: 60 }}
                  source={require("../../assets/Learning-cuate.png")}
                />
                <View style={styles.text_Context}>
                  <Text style={styles.textVocab}>Verbs</Text>
                  <Text style={styles.textVocabSub}>Translate the words</Text>
                </View>
              </View>
            </TouchableOpacity>
        </View>

        <View style = {{paddingVertical:5}}>
            <TouchableOpacity
              style={styles.buttonVocab}
              onPress={() => navigation.navigate("Vocabulary4")}
            >
              <View style={styles.contextButton}>
                <Image
                  style={{ width: 60, height: 60 }}
                  source={require("../../assets/Learning-cuate.png")}
                />
                <View style={styles.text_Context}>
                  <Text 
                    style={styles.textVocab}>
                    {" "}
                    Conjuctions and Prepositions
                  </Text>
                  <Text style={styles.textVocabSub}>Translate the words</Text>
                </View>
              </View>
            </TouchableOpacity>
      </View>


    </ScrollView>
  );
};

export default Vocabulary;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 40,
    alignContent: "center",
  },
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
    elevation: 0.7,
    width: '100%',
    backgroundColor: "#EBEBEB",
    borderRadius: 10,
  },
  textKagan: {
    flexDirection: "row",
    fontSize: 25,
    fontWeight: "bold",
    paddingVertical:5,
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
