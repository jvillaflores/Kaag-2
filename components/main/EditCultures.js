import React, { useState } from "react";
import {
  View,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");
import "firebase/firestore";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const EditCultures = ({navigation,route}) => {
    const { language } = route.params;
    const { data } = route.params;
  console.log(language);
  console.log(data);

  const [title, setTitle] = useState(data?.title);
  const [desc, setDesc] = useState(data?.desc);
  const [credits, setCredits] = useState(data?.credits);



    const submit = async () => {
        saveUserData();
      };
    
      const saveUserData = () => {
        return firebase
          .firestore()
          .collection("languages")
          .doc(language)
          .collection("Culture")
          .doc(`${data?.id}`)
          .update({
            title,
            credits,
            desc,
          })
    
          .then(() => {
            console.log("Question updated!");
          });
      };
    


  return (
    <ScrollView style={styles.container}>
      <View style={styles.bodycontainer}>
        <View style={{ marginVertical: 15 }}>
          <View>
            <Text style={[styles.text, { color: "#000000" }]}>
              Title
            </Text>
          </View>
        </View>

        <View>
          <TextInput
            style={styles.input}
            multiline={true}
            placeholder={title}
            autoCapitalize="none"
            onChangeText={(title) => setTitle(title)}
            value={title}
          />
          <Text style={[styles.text, { fontSize: 16 }]}>Credits</Text>
          <TextInput
            style={styles.input}
            multiline={true}
            placeholder={credits}
            autoCapitalize="none"
            onChangeText={(credits) => setCredits(credits)}
            value={credits}
          />
        </View>
        <View>
          <Text style={[styles.text, { fontSize: 16 }]}>
            About
          </Text>
          <Text>Brief introduction/description about the language.</Text>
          <TextInput
            multiline={true}
            style={[
              styles.addButton,
              { height: 180 },
              { paddingHorizontal: 10, flexDirection: "row" },
            ]}
            placeholder={desc}
            onChangeText={(desc) => setDesc(desc)}
            value={desc}
          ></TextInput>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
            marginVertical: 25,
          }}
        >
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#bfa42a" }]}
            onPress={() => submit()}
          >
            <Text style={[styles.text, { fontSize: 16, color: "white" }]}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
     
    </ScrollView>
  )
}

export default EditCultures;
const styles = StyleSheet.create({
    container: {
      alignContent: "center",
      top: 1,
      paddingVertical: 15,
      paddingHorizontal: 20,
    },
    input: {
      letterSpacing: 0.25,
      height: 50,
      width: "95%",
      paddingLeft: 12,
      paddingTop: 1,
      marginTop: 10,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: "#707070",
    },
    text: {
      fontWeight: "bold",
      fontSize: 20,
      letterSpacing: 0.5,
    },
    bodycontainer: {
      paddingVertical: 5,
      paddingHorizontal: 15,
    },
    addButton: {
      borderColor: "#70707033",
      borderWidth: 1.5,
      marginVertical: 10,
      borderRadius: 7,
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      flex: 1,
      borderRadius: 5,
      alignItems: "center",
      paddingVertical: 15,
    },
    buttonss: {
        position: "absolute",
        width: 70,
        height: 70,
        borderRadius: 70 / 2,
        alignItems: "center",
        justifyContent: "center",
        shadowRadius: 10,
        shadowColor: "#F02A4B",
        shadowOpacity: 0.3,
        shadowOffset: { height: 10 },
        backgroundColor: "#91B2EB",
        bottom: 0,
        right: 0,
        elevation: 9,
      },
  });
  