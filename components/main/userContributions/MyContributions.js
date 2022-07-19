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
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import AllScreen from "./MContriAll";
import ConfirmScreen from "./MContriConf";
import PendingScreen from "./MContriPend";
import DeclineScreen from "./MContriDec";

const Tab = createMaterialTopTabNavigator();

function MyContributions({ route }) {
  const { language } = route?.params ?? {};

  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarContentContainerStyle: {
            backgroundColor: "#f2f2f2",
          },
          tabBarActiveTintColor: "#004aad",
          tabBarInactiveTintColor: "#B2B2B2",

          tabBarPressColor: "#8E2835",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
          },
        })}
      >
        <Tab.Screen
          name="all"
          children={(props) => <AllScreen language={language} {...props} />}
        />
        <Tab.Screen
          name="confirm"
          children={(props) => <ConfirmScreen language={language} {...props} />}
        />
        <Tab.Screen
          name="pending"
          children={(props) => <PendingScreen language={language} {...props} />}
        />
        <Tab.Screen
          name="declined"
          children={(props) => <DeclineScreen language={language} {...props} />}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
const mapStateToProps = (store) => ({
  dictionaryAll: store.userState.dictionaryAll,
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(MyContributions);

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
