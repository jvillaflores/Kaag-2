import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Unorderedlist from "react-native-unordered-list";
import Svg, { Path, G, Rect, Polygon, Title } from "react-native-svg";
import Checkbox from "expo-checkbox";


import { connect } from "react-redux";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

function AgainContrib({ currentUser, navigation, route }) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const { language } = route?.params ?? {};
  const [complianceModal, setComplianceModal] = useState(true);

  const consent = (downloadURL)=>{
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        terms:"1"
      })
      .then(function () {
        setLoading(null);
      });
  }


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHead}>Would you like to contribute again?</Text>
        <Text style={styles.description}>
          
        </Text>
      </View>


      <View style={{flexDirection:"row", justifyContent:'center'}}>
      <TouchableOpacity
          style={[styles.button, { backgroundColor: "#215a88" }]}
          onPress={() => navigation.navigate("NewDictionary", { language: language })}
        >
          <Text style={[styles.text, { fontSize: 16, color: "white" }]}>
            Continue
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#D6D6D6" }]}
          onPress={() => navigation.navigate("Course")}
        >
          <Text style={[styles.text, { fontSize: 16, color: "#8E8E8E" }]}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
  });

export default connect(mapStateToProps, null)(AgainContrib);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    paddingHorizontal:30,
    marginTop:'50%',
  },
  containerbox: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    //marginRight: 50,
    //paddingRight: 50,
    alignContent: "center",
    paddingTop: 20,
  },
  subtitle: {
    alignSelf: "center",
    fontSize: 18,

    letterSpacing: 0.25,
    color: "white",
  },
  proceedButton: {
    justifyContent: "center",
    alignSelf: "center",
    paddingVertical: 12,
    //paddingHorizontal: 110,
    borderRadius: 10,
    width: "100%",
    // paddingRight:30,
    // marginRight: 30,
    //marginTop: 20,
  },

  checkbox: {
    width: 40,
    height: 40,
    //marginRight: 20,
  },
  label: {
    margin: 8,
  },
  header: {
    paddingVertical: 20,
  },
  
  headline_box: {
    width: "78%",
    //height: 200,
    backgroundColor: "#EBEBEB",
    alignItems: "center",
    //top: 70,
    padding: 10,
    marginTop: 20,
    //left: 40,
    borderRadius: 15,
  },
  contextButton: {
    padding: 13,
    flexDirection: "row",
    left: 20,
    alignItems: "center",
  },
  text_Context: {
    flexDirection: "column",
    marginLeft: 30,
    alignItems: "flex-start",
  },
  textHead: {
    flexDirection: "row",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
    textAlign:'center',
  },
  description: {
    flexDirection: "row",
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0.25,
    color: "black",
    //marginRight: 35,
    textAlign: "justify",
    marginTop: 10,
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
  Kagan: {
    alignContent: "flex-start",
    alignSelf: "flex-start",
    marginLeft: 50,
    marginTop: 10,
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
    fontSize: 25,
    fontWeight: "bold",
    //lineHeight: 21,
    letterSpacing: 0.5,
    color: "black",
  },
  button: {
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    paddingHorizontal:40,
    //paddingVertical:10,
    elevation: 3,
    height:'45%',

  },
  buttonVocab: {
    alignSelf: "center",
    alignItems: "flex-start",
    marginTop: 10,
    elevation: 0.7,
    width: 300,
    backgroundColor: "#EBEBEB",
    borderRadius: 10,
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
