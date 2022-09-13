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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Dimensions } from "react-native";
import Checkbox from "expo-checkbox";

function DeleteAbout({ route, navigation, currentUser }) {
  const dimensions = Dimensions.get("window");
  const imageHeight = Math.round((dimensions.width * 1) / 1);
  const imageWidth = dimensions.width;
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const { data } = route?.params ?? {};
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  console.log(data?.language);
  console.log(data?.id);
  console.log(data?.type)
  const Reject = () => {
    setLoading(true);
    rejectDictionaryAll();
  };

  const deleteContribution = () => {
    firebase
      .firestore()
      .collection("languages")
      .doc(data?.language)
      .collection(data?.type)
      .doc(`${data?.id}`)
      .delete()
      .then((result) => {
        alert("Contribution Permanently Deleted!");
        navigation.pop();
        setLoading(false);
      })
      .catch((err) => console.log(err, "-=error"));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{paddingVertical:20}}>
      <View style={{justifyContent:'center'}}>
        <Text style={{
                    textAlign:"center",
                    fontSize:20,
                    fontWeight:'bold'
                    }}>{data?.title}</Text>
        <Image
          style={{ width: imageWidth, height: imageWidth }}
          source={{ uri: data?.image }}/>
        <View style={styles.padding}>
          <TextInput
            multiline={true}
            editable={false}
            style={styles.textInput}>{data?.desc}</TextInput>
        </View>  
      </View>
      <View style={styles.center}>
        <View style={styles.paddingLeft}>
          <Text style={styles.title_text}>Delete {data?.word} </Text>
          <Text style={styles.guidelines}>
            Are you sure that you want to delete your contribution {data?.word}?
            Deleting this will permanently remove it from the database. If not
            press the back button to cancel the deletion.
          </Text>
          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
              color={toggleCheckBox ? "#215a88" : undefined}
            />
            <Text style={styles.description}>
              {" "}
              I acknowlede the risks of deleting this data.
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.padding}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: toggleCheckBox ? "#215a88" : "#91B2EB" },
          ]}
          disabled={!toggleCheckBox}
          onPress={() => [deleteContribution()]}
        >
          <Text style={styles.subtitle}> Delete </Text>
        </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(DeleteAbout);
const styles = StyleSheet.create({
  container: {
    flex:1,
    
  },
  subtitle: {
    alignSelf: "center",
    fontSize: 18,

    letterSpacing: 0.25,
    color: "white",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  padding:{
    paddingHorizontal:30, 
    paddingVertical: 20, 
  },
  button: {
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 1,
    width: "100%",
    backgroundColor: "#215A88",
  },
  textInput:{
    backgroundColor:"#e7e7e7", 
    paddingHorizontal:15,
    paddingVertical: 15,
    borderRadius:6,
  },
  audioButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    borderWidth: 1,
    borderRadius: 10,
    height: 70,
    borderColor: "#707070",
    paddingTop: 20,
    marginTop: 10,
  },
  guidelines: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#707070",
    textAlign: "justify",
  },
  addAudio: {
    flex: 1,
  },

  bottom: {
    marginBottom: 20,
  },

  center: {
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal:30
  },

  paddingLeft: {
    alignContent: "flex-start",
    justifyContent: "center",
  },

  title_text: {
    //alignContent:"flex-start",
    fontWeight: "bold",
    fontSize: 17,
  },
  text_input: {
    alignSelf: "flex-start",
    paddingLeft: 12,
    paddingTop: 10,
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
  tags_input: {
    letterSpacing: 0.25,
    height: 80,
    width: "95%",
    paddingLeft: 12,
    paddingTop: 1,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#707070",
  },
  description_input: {
    letterSpacing: 0.25,
    height: 100,
    width: "95%",
    paddingLeft: 12,
    paddingTop: 1,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#707070",
  },
});
