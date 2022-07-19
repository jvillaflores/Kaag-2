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
    FlatList,
    KeyboardAvoidingView,
    ToastAndroid,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import firebase from "firebase";
  require("firebase/firestore");
  require("firebase/firebase-storage");
  import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

{
    /*Button Form */
  }
  export const FormButton = ({
    labelText = "",
    handleOnPress = null,
    style,
    isPrimary = true,
    ...more
  }) => {
    return (
      <TouchableOpacity
        style={{
          paddingVertical: 10,
          backgroundColor: isPrimary ? COLORS.primary : COLORS.white,
          borderWidth: 1,
          borderColor: COLORS.primary,
          borderRadius: 5,
          ...style,
        }}
        activeOpacity={0.9}
        onPress={handleOnPress}
        {...more}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            color: isPrimary ? COLORS.white : COLORS.primary,
          }}
        >
          {labelText}
        </Text>
      </TouchableOpacity>
    );
  };

const AddEdit = ({navigation, route}) => {
    const { language } = route?.params ?? {};
  console.log(language);

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
    
   <ScrollView>
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
              onPress={() => navigation.navigate("Edit", { data: item , language: language})}
            >
              <View style={styles.bodycontainer}>
                <Text style={styles.inKagan}>{item.title} </Text>
                <Text style={styles.meaning}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
          <Pressable
        style={styles.buttonss}
        onPress={() =>
          navigation.navigate("AddQuestions", { language: language })
        }
        //onPress={() => navigation.navigate("NewContribution")}
      >
        <MaterialCommunityIcons name="plus" color={"#ffffff"} size={40} />
      </Pressable>
   </ScrollView>
    
    
  )
}

export default AddEdit;
const COLORS = {
    primary: "#4630EB",
    secondary: "#000020",
  
    success: "#00C851",
    error: "#ff4444",
  
    black: "#171717",
    white: "#FFFFFF",
    background: "#f4f4f4",
    border: "#F5F5F7",
  };
  
  export const SIZES = {
    base: 10,
  };
  const styles = StyleSheet.create({
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
      right: 30,
      elevation: 9,
    },
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
