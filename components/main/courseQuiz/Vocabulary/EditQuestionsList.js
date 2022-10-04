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
import React, { useEffect, useState } from "react";
import firebase from "firebase";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

require("firebase/firestore");
require("firebase/firebase-storage");

const EditQuestionsList = ({route, navigation, language, data}) => {

    

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
        .doc(`${data?.id}`)
        .collection('QNA')
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
             onPress={() => navigation.navigate("EditVocabQuestionItem", { currentData: item, language: language, data: data})}
           >
             <View style={styles.bodycontainer}>
               
               <MaterialCommunityIcons
                      style={{paddingRight:15}}
                      name="menu"
                      color={"#c2c2c2"}
                      size={20}
                    />
              <Text style={styles.inKagan}>{item.question} </Text>
             </View>
           </TouchableOpacity>
         );
       }}
     />
 )
}

export default EditQuestionsList;
const COLORS = {
  primary: "#215A88",
  secondary: "#000020",

  success: "#00C851",
  error: "#ff4444",

  black: "#171717",
  white: "#FFFFFF",
  background: "#f4f4f4",
  border: "#F5F5F7",
};
const styles = StyleSheet.create({
    container: {
      padding: 20,
            borderRadius: 5,
            marginVertical: 5,
            marginHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
    },
    bodycontainer: {
      paddingVertical: 3,
      paddingHorizontal: 15,
      flexDirection:'row',
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
      fontSize: 16,
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
  