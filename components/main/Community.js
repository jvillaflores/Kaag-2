import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  FlatList,
  SafeAreaView,
  Button,
  Alert,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase";
require("firebase/firestore");
import FeedScreen from "./Feed";
import SocialScreen from "./Social";
import FoodScreen from "./Food";
import ClothingScreen from "./Clothing";
import EventScreen from "./Event";

import { NavigationContainer } from "@react-navigation/native";

import DeleteImageScreen from "./DeleteImageScreen";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function Community({ currentUser, route, navigation }) {
  const [datalist, setDatalist] = useState("");
  const { language } = route?.params ?? {};
 
  useEffect(() => {
    setDatalist(currentUser);
  }, [currentUser]);
  useEffect(() => {
    //used to fetch the name of the current user.
    const unsubscribe = navigation.addListener("focus", () => {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
          
          if (snapshot.exists) {
            let currentUser = snapshot.data();
            setDatalist(currentUser);
          } else {
          }
        });
    });

    return unsubscribe;
  }, [navigation]);


  

  return (
    <NavigationContainer independent={true}>
      <View style={styles.container}>
        <View style={styles.innercontainer}>
          <Text style={styles.textHead}>Welcome, {datalist.name} </Text>
          <Text style={styles.textSubHead}>Engage in Community</Text>
          <Text style={styles.textreg}>
            Create and share your photos and stories with the community.
          </Text>
        </View>
      </View>
      <Stack.Navigator>
        <Stack.Screen
          name="TopTab"
          component={TopTab}
          options={{ headerShown: false }}
          initialParams={{data:language, currentUser:currentUser}}
        />
        <Stack.Screen name="DeleteImageScreen" component={DeleteImageScreen}
         options={{
          title: "Delete Image Contribution",
          headerShadowVisible: false,
          headerTintColor: "black",
          headerStyle: {
            
            backgroundColor: "#f2f2f2",
            borderBottomWidth: 0,
          },
        }} />
      </Stack.Navigator>

      <Pressable
        style={styles.button}
        onPress={() =>
          navigation.navigate("MainContribution", { language: language })
        }
        //onPress={() => navigation.navigate("NewContribution")}
      >
        <MaterialCommunityIcons name="plus" color={"#ffffff"} size={40} />
      </Pressable>
    </NavigationContainer>
    // <View>
    //   <Text>{language}</Text>
    // </View>
  );
}

function TopTab({route,navigation}) {
 
   const { data } = route?.params ?? {};
   const {currentUser} = route?.params??{};
  
  return(
    <Tab.Navigator
        labeled="false"
        screenOptions={({ route }) => ({
          tabBarContentContainerStyle: {
            backgroundColor: "#f2f2f2",
          },
          tabBarLabelStyle: { fontSize: 12 },
          tabBarActiveTintColor: "#215a88",
          tabBarInactiveTintColor: "#B2B2B2",
          tabBarShowLabel: false,
          tabBarPressColor: "#215a88",
          
        })}   
      >
        <Tab.Screen
          name="Social"
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="view-dashboard" color={color} size={26} />
            )
          }}
          children={(props) => <SocialScreen language={data} currentUser={currentUser} {...props} />}
        />
        
        <Tab.Screen
          name="Food"
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="silverware-spoon" color={color} size={26} />
            )
          }}
          children={(props) => <FoodScreen language={data} {...props} />}
        />
        <Tab.Screen
          name="Clothes"
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="tshirt-crew" color={color} size={26} />
            )
          }}
          children={(props) => <ClothingScreen language={data} {...props} />}
        />
        <Tab.Screen
          name="Events"
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="party-popper" color={color} size={26} />
            )
          }}
          children={(props) => <EventScreen language={data} {...props} />}
        />
        <Tab.Screen
          name="User"
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-star" color={color} size={26} />
            )
          }}
          children={(props) => <FeedScreen language={data} currentUser = {currentUser}  {...props} />}
        />
        
        
      </Tab.Navigator>

      
  )
  
}


const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(Community);

const styles = StyleSheet.create({
  title: {
    top: 20,
    left: 10,
  },
  container: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: -360,
    flex: 1,
  },
  innercontainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 30,
    marginLeft: 20,
    marginRight: 15,
    //backgroundColor: '#FFFFFF',
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
    backgroundColor: "#91B2EB",
    bottom: 30,
    right: 30,
    elevation: 9,
  },

  textHead: {
    flexDirection: "row",
    fontSize: 21,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "#215a88",
  },
  textSubHead: {
    flexDirection: "row",
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    //color: "white",
  },
  textreg: {
    flexDirection: "row",
    fontSize: 15,
    // fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    //color: "white",
  },
  headLine: {
    flexDirection: "row",
    width: "100%",
    height: 110,
    backgroundColor: "#8E2835",
  },
  textHeadline: {
    flexDirection: "row",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
  },
  searchBar: {
    top: 40,
    left: -120,
    width: "100%",
  },
  Kagan: {
    top: 90,
    left: 40,
  },
  grammar: {
    top: 70,
    left: 40,
  },
  pronun: {
    top: 100,
    left: 40,
  },
  textKagan: {
    flexDirection: "row",
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
  },

  buttonVocab: {
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    width: "90%",
    backgroundColor: "#dadada",
    top: -70,
    left: -40,
    height: 280,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    borderColor: "black",
  },
  buttonGrammar: {
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    width: "90%",
    backgroundColor: "#dadada",
    top: -30,
    left: -40,
    height: 300,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    borderColor: "black",
  },
  buttonPronun: {
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    width: "90%",
    backgroundColor: "#dadada",
    top: -40,
    left: -40,
    height: 105,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    borderColor: "black",
  },
  Vocab: {
    top: 10,
    left: -20,
    paddingBottom: 20,
  },
  VocabSubSub: {
    top: 5,
    left: -10,
  },
  VocabSub: {
    top: 5,
    left: -10,
  },
  textVocab: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
  },
  textVocabSub: {
    fontSize: 11,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
  },
  textVocabSubSub: {
    fontSize: 11,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "#8E2835",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
  },
  input: {
    height: 45,
    width: "90%",
    backgroundColor: "white",
    margin: 12,
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  buttonAudio: {
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 50,
    elevation: 3,
    width: 50,
    backgroundColor: "#79222D",
    top: 300,
    left: 130,
    height: 50,
    borderColor: "black",
  },
  Icon: {
    left: 7,
  },
});
