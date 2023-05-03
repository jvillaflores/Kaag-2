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

function ValidateImage({ route, navigation, currentUser, }) {
  const dimensions = Dimensions.get("window");
  const imageHeight = Math.round((dimensions.width * 1) / 1);
  const imageWidth = dimensions.width;
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingDecline, setLoadingDecline] = useState(false);
  const { data } = route?.params ?? {};
  const { language } = route?.params ?? {};
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  
  const Reject = () => {
    setLoadingDecline(true);
    DeclineImage();
  };

  const Accept = () => {
    setLoading(true);
    AcceptImage();
  };

  const AcceptImage = () => {
    firebase
      .firestore()
      .collection("languages")
      .doc(language)
      .collection("posts")
      .doc(`${data?.id}`)
      .update({
        status:"1",
      })
      .then((result) => {
        alert("Contribution Accepted!");
        navigation.pop();
        setLoading(false);
      })
      .catch((err) => console.log(err, "-=error"));
  };
  const DeclineImage = () => {
    firebase
      .firestore()
      .collection("languages")
      .doc(language)
      .collection("posts")
      .doc(`${data?.id}`)
      .update({
        status:"2",
      })
      .then((result) => {
        alert("Contribution Declined!");
        navigation.pop();
        setLoadingDecline(false);
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
                    fontWeight:'bold',
                    paddingVertical: 10,
                    }}>{data?.title}</Text>
        <Image
          style={{ width: imageWidth, height: imageWidth }}
          source={{ uri: data?.downloadURL}}/>
         
      </View>
      <View style={styles.padding}>
        <View style={styles.paddingLeft}>
          <Text style={styles.title_text}> {data?.title} </Text>
          <Text style={styles.guidelines}> Contributed by : {data?.username}</Text>
          <Text style={styles.guidelines}> Category : {data?.category}</Text>
          <Text style={styles.guidelines}>
            {data?.description}
          </Text>
          
        </View>
      </View>
      <View style={styles.row}>
      <Pressable style={styles.buttonAccept} onPress={() => Accept()}>
            <Text style={styles.subtitle}>
              {loading ? "Accepting..." : "Accept"}
            </Text>
          </Pressable>
        

        <Pressable
          style={styles.button}
          onPress={() => Reject()}
          
        >
          <Text style={styles.subtitle}><Text style={styles.subtitle}>
              {loadingDecline ? "Declining..." : "Decline"}
            </Text></Text>
        </Pressable>
      </View>
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(ValidateImage);
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 100,
    marginTop: 30,
  },
  buttonAccept: {
    // alignSelf: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    // elevation: 1,
    width: "40%",
    backgroundColor: "#73B504",
    //top: 130,
    // marginTop: 20,
    // marginBottom: 80,
  },
  button: {
    // alignSelf: "flex-end",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    // elevation: 1,
    width: "40%",
    backgroundColor: "#8E2835",
    //top: 130,
    // marginBottom: 100,
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
