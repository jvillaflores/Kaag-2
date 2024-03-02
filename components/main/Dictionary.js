import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  FlatList,
  Alert
} from "react-native";

import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");
import { NavigationContainer } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Checkbox from "expo-checkbox";
// import { Audio } from "expo-av";
// import { Sound } from "expo-av/build/Audio";
import NetInfo from '@react-native-community/netinfo';

var head = require("../../assets/learning.svg");

function Dictionary({ route, navigation }) {
  const [playing, setPlaying] = useState(false);
  const [datalist, setDatalist] = useState("");
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState("");
  const [masterDataSource, setMasterDataSource] = useState("");
  const [toggleCheckBox, setToggleCheckBox] = useState(true);
  const [toggleCheckBox1, setToggleCheckBox1] = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [loading, setLoading] = useState(false);
  const { language } = route?.params ?? {};

  var setLanguage = language;
  var languageDictionary = language.concat("Dictionary");

  // const startLoading = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // };
  // useEffect(() => {
  //   setDatalist(filteredDictionary);
  //   setMasterDataSource(filteredDictionary);
  //   setFilteredDataSource(filteredDictionary);
  // }, [filteredDictionary]);

  useEffect(() => {
    //used for fetching the dictionary data from the firestore
    const unsubscribe = navigation.addListener("focus", () => {
      firebase
        .firestore()
        .collection("languages")
        .doc(language)
        .collection("dictionary")
        .orderBy("englishWord","asc")
        .where("status", "==", "1")
        //add new index so it will limit by status=1
        //filtering all of the data from the cloud and only accepting status == 1, meaning only the accepted words
        .get()
        .then((snapshot) => {
          let masterDataSource = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          
          });
          //Preparing the states for the searchFilterFunction
          setDatalist(masterDataSource);
          setFilteredDataSource(masterDataSource);
          setMasterDataSource(masterDataSource);
          
        });
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        Alert.alert(
          'Connection Lost',
          'Please check your internet connection.',
          [
            {
              text: 'OK',
            },
          ]
        );
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  

  const handleCheckboxChange = () => {
    // Perform the first action when the checkbox is toggled
    // For example, you can update the state or perform some other operation.
    // In this example, we're just toggling the checkbox state.
    setToggleCheckBox(true);
    setToggleCheckBox1(false);
    setToggleCheckBox2(false);
  }
  const handleCheckboxChange1 = () => {
    // Perform the first action when the checkbox is toggled
    // For example, you can update the state or perform some other operation.
    // In this example, we're just toggling the checkbox state.
    setToggleCheckBox1(true);
    setToggleCheckBox(false);
    setToggleCheckBox2(false);
  }
  const handleCheckboxChange2 = () => {
    // Perform the first action when the checkbox is toggled
    // For example, you can update the state or perform some other operation.
    // In this example, we're just toggling the checkbox state.
    setToggleCheckBox2(true);
    setToggleCheckBox1(false);
    setToggleCheckBox(false);
  }

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text && toggleCheckBox == true) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      
    
      const newData = masterDataSource.filter((item) =>
      
        item.englishWord.toUpperCase().startsWith(text.toUpperCase()) || item.word.toUpperCase().startsWith(text.toUpperCase()) 
      
      // else if (toggleCheckBox1 == true){
      //   item.englishWord.toUpperCase().startsWith(text.toUpperCase()) 
      // }
      // else if (toggleCheckBox2 == true){
      //    item.word.toUpperCase().startsWith(text.toUpperCase()) 
      // }
      
    
       
      ); 
      
      setFilteredDataSource(newData);
      setSearch(text);
      
    } 
    else if (text && toggleCheckBox1 == true) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      setToggleCheckBox(false);
      setToggleCheckBox2(false);
      const newData = masterDataSource.filter((item) =>
      
        item.englishWord.toUpperCase().startsWith(text.toUpperCase())  
      
      // else if (toggleCheckBox1 == true){
      //   item.englishWord.toUpperCase().startsWith(text.toUpperCase()) 
      // }
      // else if (toggleCheckBox2 == true){
      //    item.word.toUpperCase().startsWith(text.toUpperCase()) 
      // }
      
    
       
      ); 
      
      setFilteredDataSource(newData);
      setSearch(text);
      
    } 
    else if (text && toggleCheckBox2 == true) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter((item) =>
      
        item.word.toUpperCase().startsWith(text.toUpperCase())  
      
      // else if (toggleCheckBox1 == true){
      //   item.englishWord.toUpperCase().startsWith(text.toUpperCase()) 
      // }
      // else if (toggleCheckBox2 == true){
      //    item.word.toUpperCase().startsWith(text.toUpperCase()) 
      // }
      
    
       
      ); 
      
      setFilteredDataSource(newData);
      setSearch(text);
      
    } 
    else {
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
          <Text style={styles.textHead}>KAAG</Text>
          <Text style={styles.textSubHead}>Dictionary</Text>
          <TextInput
            style={styles.input}
            placeholder="Search for words..."
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
          ></TextInput>
            <View style={styles.checkboxContainer1}>
              <View style={styles.checkBoxCont}>
                  <Checkbox
                    style={styles.checkbox}
                    value={toggleCheckBox}
                    onValueChange={handleCheckboxChange}
                    color={toggleCheckBox ? "#215a88" : undefined}
                  />
                  <Text style={styles.guidelines}>
                    
                    All
                  </Text>
              </View>
              <View style={styles.checkBoxCont}>
                  <Checkbox
                    style={styles.checkbox}
                    value={toggleCheckBox1}
                    onValueChange={handleCheckboxChange1}
                    color={toggleCheckBox1 ? "#215a88" : undefined}
                  />
                  <Text style={styles.guidelines}>
                    
                    English
                  </Text>
              </View>
              
              <View style={styles.checkBoxCont}>
                  <Checkbox
                    style={styles.checkbox}
                    value={toggleCheckBox2}
                    onValueChange={handleCheckboxChange2}
                    color={toggleCheckBox2 ? "#215a88" : undefined}
                  />
                  <Text style={styles.guidelines}>
                    
                    {language}
                  </Text>
              </View>
              
              
            </View>
        </View>
      </View>
      <FlatList
        nestedScrollEnabled
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
        horizontal={false}
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        updateCellsBatchingPeriod={50}
        windowSize={10}
        removeClippedSubviews={true}
        data={filteredDataSource}
        style={{ flex: 1 }}
        renderItem={({ item }) => {
          
          return (
            <TouchableOpacity
              style={styles.container}
              onPress={() => navigation.navigate("Word", { data: item })}
            >
            
              <View style={styles.bodycontainer}>
                <Text style={styles.inKagan}>{item.englishWord.toLowerCase()} </Text>
                <Text style={styles.inFilipino}>
                  {item.filipino}
                </Text>
                <Text style={styles.meaning}>{item.word} </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </NavigationContainer>
  );
}

export default Dictionary;

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
    color: "white",
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
    fontSize: 13,
    color: "#215a88",
    fontStyle: "italic",
  },
  meaning: {
    fontSize: 15,
    letterSpacing: 0.25,
    color: "black",
    textAlign: "justify",
  },
  checkBoxCont: {
    flexDirection: "row",
  },
  checkboxContainer1: {
    // flex:1,
    flexDirection: "row",
    // marginVertical: 10,
    // alignItems:"center",
    // marginRight: 50,
    // paddingRight: 90,
    // justifyContent: "flex-start",
    // marginTop: -2,
    
  },
  checkbox: {
    width: 20,
    height: 20,
    color: "#ffffff",
  },
  guidelines: {
    fontSize: 15,
    fontStyle: "bold",
    color: "#ffffff",
    paddingLeft: 5,
    paddingRight:  30,
  }
});
