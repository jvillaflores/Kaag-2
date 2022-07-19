import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  FlatList,
} from "react-native";

import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";

var head = require("../../assets/learning.svg");

function Language({ navigation }) {
  const [playing, setPlaying] = useState(false);
  const [datalist, setDatalist] = useState("");
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState("");
  const [masterDataSource, setMasterDataSource] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //Service to get the data from the server to render
    // Fetch the data that are being stored in the languages
    const unsubscribe = navigation.addListener("focus", () => {
      firebase
        .firestore()
        .collection("languages")
        .get()
        .then((snapshot) => {
          let masterDataSource = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });

          //Preparation for the searchFilterFunction
          setDatalist(masterDataSource);
          setFilteredDataSource(masterDataSource);
          setMasterDataSource(masterDataSource);
          console.log(masterDataSource);
        });
    });

    return unsubscribe;
  }, [navigation]);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = `${
          item.language ? item.language.toUpperCase() : "".toUpperCase()
        }`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  return (
    <NavigationContainer independent={true}>
      <View style={styles.headLine}>
        <View style={styles.title}>
          <Text style={styles.textHead}>ALIMA</Text>
          <Text style={styles.textSubHead}>MinNa LProc</Text>
          <TextInput
            style={styles.input}
            placeholder="Search for Langauges..."
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
          ></TextInput>
        </View>
      </View>
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
              onPress={() =>
                navigation.navigate("Main", { language: item.language })
              }
            >
              <View style={styles.bodycontainer}>
                <Text style={styles.language}>{item.language} </Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </NavigationContainer>
  );
}

// const mapStateToProps = (state, ownProps) => ({
//   languageState: store.userState.l,
// });

// export default connect(mapStateToProps, null)(Language);

export default Language;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    top: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
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
  language: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 13,
    letterSpacing: 0.25,
    color: "black",
    textAlign: "justify",
    marginTop: 5,
  },
});
