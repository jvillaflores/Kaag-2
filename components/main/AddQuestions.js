import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

const AddQuestions = ({ route,navigation}) => {

  const { language } = route?.params ?? {};

  const [filteredDataSource, setFilteredDataSource] = useState("");
  const [masterDataSource, setMasterDataSource] = useState("");
  const [datalist, setDatalist] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      firebase
        .firestore()
        .collection("languages")
        .doc(language)
        .collection('Quizzes')
        .get()
        .then((snapshot) => {
          let masterDataSource = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });

          setDatalist(masterDataSource);
          setFilteredDataSource(masterDataSource);
          setMasterDataSource(masterDataSource);
          console.log(masterDataSource);
        });
    });

    return unsubscribe;
  }, [navigation]);



  return (
     <FlatList
        nestedScrollEnabled
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
        horizontal={false}
        data={filteredDataSource}
        style={{ flex: 1 }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.container}
              onPress={() => navigation.navigate("Add", { data: item , language: language})}
            >
              <View style={styles.bodycontainer}>
                <Text style={styles.inKagan}>{item.title} </Text>
                <Text style={styles.meaning}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
  )
}

export default AddQuestions;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    top: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  bodycontainer: {
    paddingVertical: 3,
    paddingHorizontal: 15,
  },
  headLine: {
    flexDirection: "column",
    width: "100%",
    height: 200,
    backgroundColor: "#215a88",
    padding: 10,
  },

  title: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    alignItems: "center",
  },
  textHead: {
    flexDirection: "row",
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "#91B2EB",
  },
  textSubHead: {
    flexDirection: "row",
    fontSize: 15,
    lineHeight: 21,
    letterSpacing: 0,
    color: "white",
  },

  input: {
    height: 45,
    width: "90%",
    backgroundColor: "white",
    margin: 12,
    paddingLeft: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  input1: {
    height: 45,
    width: "50%",
    backgroundColor: "white",
    margin: 12,
    paddingLeft: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  inKagan: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.3,
  },
  inFilipino: {
    fontSize: 11,
    color: "#215a88",
    fontStyle: "italic",
  },
  meaning: {
    fontSize: 13,
    letterSpacing: 0.25,
    color: "black",
    textAlign: "justify",
  },
});
