import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  FlatList,
  Picker,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


import Question from "../Speech/EditQuestionsList"

const Tab = createMaterialTopTabNavigator();

function AddAnotherQuestion({ route, navigation}) {
  const { language } = route?.params ?? {};
  const { data } = route?.params ?? {};
  console.log(data?.id)
  console.log(language)
  return (
    
    <SafeAreaView style={styles.container}>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarContentContainerStyle: {
          backgroundColor: "#f2f2f2",
        },
        tabBarActiveTintColor: "#215a88",
        tabBarInactiveTintColor: "#B2B2B2",

        tabBarPressColor: "#215a88",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen
        name="EDIT"
        children={(props) => <Question language={language} data={data} {...props} />}
      />
      
      
    </Tab.Navigator>
    <TouchableOpacity
      style={styles.button}
      onPress={() =>
        navigation.navigate("EditAddSpeechQuestionItem", {data: data , language: language })
      }
    >
      <MaterialCommunityIcons name="plus" color={"#ffffff"} size={40} />
    </TouchableOpacity>
  </SafeAreaView>
  );
}

export default AddAnotherQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingHorizontal:10,
    justifyContent: "center",
  },
  listTab: {
    alignSelf: "center",
    marginBottom: 20,
    flexDirection: "row",
    paddingHorizontal: 2,
    backgroundColor: "#ebebeb",
    borderRadius: 10,
  },
  button: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    alignItems: "center",
    justifyContent: "center",
    //shadowRadius: 10,
    //shadowColor: "#F02A4B",
    //shadowOpacity: 0.3,
    //shadowOffset: { height: 10 },
    backgroundColor: "#215A88",
    bottom: 30,
    right: 30,
    elevation: 9,
  },
  btnTab: {
    width: Dimensions.get("window").width / 4.5,
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "#ebebeb",
    padding: 10,
    justifyContent: "center",
  },
  textTab: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
    //lineHeight: 1,
  },
  brnTabActive: {
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  textTabActive: {
    color: "#8E2835",
    fontWeight: "bold",
    fontSize: 13,
  },
  itemContainer: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  itemLogo: {
    padding: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
  },

  itemBody: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },

  itemsName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemStatus: {
    backgroundColor: "#69C080",
    paddingHorizontal: 17,
    height: 30,
    justifyContent: "center",
    right: 14,
    borderRadius: 5,
  },
  headLine: {
    flexDirection: "column",
    width: "100%",
    padding: 30,
    top: -20,
    height: 150,
    backgroundColor: "#8E2835",
    alignItems: "flex-start",
    justifyContent: "center",
    position: "relative",
  },
  textHead: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.25,
    position: "relative",
    alignSelf: "center",
    color: "white",
  },
  textSubHead: {
    flexDirection: "row",
    fontSize: 13,
    letterSpacing: 0.25,
    color: "white",
  },
  title: {
    top: 40,
    //left: 110,
  },
  statusFont: {
    fontWeight: "bold",
  },
  arrowRight: {
    backgroundColor: "#ebebeb",
    paddingHorizontal: 5,
    width: 30,
    height: 30,
    justifyContent: "center",
    right: 2,
    borderRadius: 5,
    margin: 10,
  },
  buttonContainer: {
    alignItems: "flex-end",
    alignSelf: "center",
  },
});
