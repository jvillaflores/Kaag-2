import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Checkbox from "expo-checkbox";


import { connect } from "react-redux";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

function ContributeDictionary({ currentUser, navigation, route }) {
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

  if (currentUser.terms == "0") {
  return (
    
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHead}>Help application grow </Text>
        <Text style={styles.description}>
          Community language champions, linguistic scholars, and others involved
          in language revitalization work are invited to help build and improve
          the mobile application. Here, we can add new content relevant to the{" "}
          language.{" "}
        </Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.textHead}>Consent Form:</Text>

        <Text style={styles.description}>
          {" "}
          • I confirm that I was provided with opportunity to take into consideration the information and was able to ask all the questions I wanted.
        </Text>

        <Text style={styles.description}>
          {" "}
          • I am fully aware of what is expected from me. I understand all the functionalities of this application and what I can do with it.
        </Text>

        <Text style={styles.description}>
          {" "}
          • My decision to participate in this study is fully voluntary. I also understand that I am free to leave at any time without providing any reason. I understand that my withdrawal will not affect my legal rights.
        </Text>

        <Text style={styles.description}>
          {" "}
          •  I allow that all my data contribution may be use for whatever purpose of this study.
        </Text>

        <View style={styles.checkboxContainer}>
          {/* <CheckBox
            disabled={false}
            value={toggleCheckBox}
            
            style={styles.checkbox}
          /> */}
          <Checkbox
            style={styles.checkbox}
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
            color={toggleCheckBox ? "#215a88" : undefined}
          />
          <Text style={styles.description}> I agree to all conditions</Text>
        </View>
      </View>

      <View style={[{ marginTop: -20 }]}>
        <TouchableOpacity
          style={[
            styles.proceedButton,
            { backgroundColor: toggleCheckBox ? "#215a88" : "#91B2EB" },
          ]}
          disabled={!toggleCheckBox}
          onPress={() =>
            navigation.navigate("NewDictionary", { language: language }, consent())
          }
        >
          <Text style={styles.subtitle}> PROCEED </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
  } else {
    return(
    <ScrollView style={styles.containercon}>
    <View style={styles.header}>
      <Text style={[styles.textHead,{textAlign:'center'}]}>Would you like to contribute again?</Text>
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

    )

  }

}
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(ContributeDictionary);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 40,
    alignContent: "center",
  },
  containercon: {
    flex: 1,
    alignContent: "center",
    paddingHorizontal:30,
    marginTop:'50%',
  },

  header: {
    paddingVertical: 20,
  },

  textHead: {
    flexDirection: "row",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
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

  checkboxContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    //marginRight: 50,
    //paddingRight: 50,
    alignContent: "center",
    paddingTop: 20,
  },

  checkbox: {
    width: 40,
    height: 40,
  },

  proceedButton: {
    justifyContent: "center",
    alignSelf: "center",
    paddingVertical: 12,
    borderRadius: 10,
    width: "100%",
  },

  subtitle: {
    alignSelf: "center",
    fontSize: 18,

    letterSpacing: 0.25,
    color: "white",
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
  text: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
  },
 
});
