import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase/app";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
// import { LogBox } from "react-native";
// import _ from "lodash";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// LogBox.ignoreLogs(["Warning:..."]); // ignore specific logs
// LogBox.ignoreAllLogs(); // ignore all logs
// const _console = _.clone(console);
// console.warn = (message) => {
//   if (message.indexOf("Setting a timer") <= -1) {
//     _console.warn(message);
//   }
// };
const store = createStore(rootReducer, applyMiddleware(thunk));

const firebaseConfig = {
  apiKey: "AIzaSyAHGEUMnTu_5XeqWK2SIz_4w5icJEvxZrA",
  authDomain: "minna-47e79.firebaseapp.com",
  projectId: "minna-47e79",
  storageBucket: "minna-47e79.appspot.com",
  messagingSenderId: "162831823788",
  appId: "1:162831823788:web:c442ab1485f72e4fccc009",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import LandingScreen from "./components/auth/Landing";
import LanguageScreen from "./components/main/Language";
import RegisterScreen from "./components/auth/Register";
import ForgotPasswordScreen from "./components/auth/ForgotPassword";
import LoginScreen from "./components/auth/Login";
import MainScreen from "./components/Main";
// import Landing from "./components/auth/Landing";
import ContributionScreen from "./components/main/Contribution";
import VocabularyScreen from "./components/main/Vocabulary";
import GrammarScreen from "./components/main/Grammar";
import WordScreen from "./components/main/Word";
import SaveScreen from "./components/main/Save";
import NewDictionaryScreen from "./components/main/NewDictionary";
import MyContributionsScreen from "./components/main/userContributions/MyContributions";
import BeAValidatorScreen from "./components/main/BeAValidator";
import ValidatorAppScreen from "./components/main/ValidatorApplication";
import ValidationScreen from "./components/main/Validation";
import ValidateWordScreen from "./components/main/wordValidation/ValidateWord";
import DeclineScreen from "./components/main/Decline";
import ApplicationsScreen from "./components/main/userValidation/Applications";
import ApplicationConfScreen from "./components/main/ApplicationConf";
import SpeechScreen from "./components/main/Speech";
import UserContributionScreen from "./components/main/UserContribution";
import CultureScreen from "./components/main/AboutCulture";
import FoodScreen from "./components/main/AboutFood";
import EventsScreen from "./components/main/AboutEvents";
import TraditionScreen from "./components/main/Traditions";
import ClothingScreen from "./components/main/AboutClothing";
import AddLanguageScreen from "./components/main/AddLanguage";
import AddQuiz from "./components/main/AddQuiz";
import AddQuestion from "./components/main/AddQuestion";
import EditQuestion from "./components/main/EditQuestion";
import Testpage from "./components/main/Testpage";
import PlayQuizScreen from "./components/main/PlayQuizScreen";
import Edit from "./components/main/Edit";
import Edits from "./components/main/Edits";
import Add from "./components/main/Add";
import AddEdit from "./components/main/AddEdit";
import AddQuestions from "./components/main/AddQuestions";
import AddQuest from "./components/AddQuest";
import EditAbout from "./components/main/EditAbout";
import EditEvent from "./components/main/EditEvent";
import EditEvents from "./components/main/EditEvents";
import AddAbout from "./components/main/AddAbout";
import EditTraditions from "./components/main/EditTraditions";
import EditFood from "./components/main/EditFood";
import AddFood from "./components/main/AddFood";
import EditFoods from "./components/main/EditFoods";
import EditClothing from "./components/main/EditClothing";
import EditClothings from "./components/main/EditClothings";
import AddClothings from "./components/main/AddClothings";
import EditCulture from "./components/main/EditCulture";
import EditCultures from "./components/main/EditCultures";
import AddCulture from "./components/main/AddCulture";




const Stack = createStackNavigator();

// import { LogBox } from "react-native";

// LogBox.ignoreLogs(["Setting a timer"]);
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return <View style={{ flex: 1, justifyContent: "center" }}></View>;
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                headerShadowVisible: false,
                headerTintColor: "#ffffff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  borderBottomWidth: 0,
                },
              }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
              options={{
                title: "Forgot Password",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShadowVisible: false,
                headerTintColor: "#ffffff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  borderBottomWidth: 0,
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Language">
            <Stack.Screen
              name="Language"
              component={LanguageScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="MainContribution"
              component={ContributionScreen}
              navigation={this.props.navigation}
              options={{
                title: "New Post",
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                },
              }}
            />
            <Stack.Screen
              name="Vocabulary"
              component={VocabularyScreen}
              options={{
                title: "Vocabulary",
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                },
              }}
            />
            <Stack.Screen
              name="Speech"
              component={SpeechScreen}
              options={{
                title: "Speech",
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                },
              }}
            />

            <Stack.Screen
              name="Grammar"
              component={GrammarScreen}
              options={{
                title: "Phrases",
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                },
              }}
            />
            <Stack.Screen
              name="Word"
              component={WordScreen}
              options={{
                title: "",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />

            <Stack.Screen
              name="Culture"
              component={CultureScreen}
              options={{
                title: " ",
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                },
              }}
            />

            <Stack.Screen
              name="Food"
              component={FoodScreen}
              options={{
                title: " ",
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                },
              }}
            />

            <Stack.Screen
              name="Event"
              component={EventsScreen}
              options={{
                title: " ",
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                },
              }}
            />

            <Stack.Screen
              name="Clothing"
              component={ClothingScreen}
              options={{
                title: " ",
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                },
              }}
            />

            <Stack.Screen
              name="Traditions"
              component={TraditionScreen}
              options={{
                title: " ",
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                },
              }}
            />

            {/* <Stack.Screen
              name="NewWord"
              component={newDReviewScreen}
              options={{
                title: "",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            /> */}

            <Stack.Screen
              name="Save"
              component={SaveScreen}
              navigation={this.props.navigation}
              options={{
                title: "New Post",
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                },
                //           headerRight:() => (
                //             <TouchableOpacity title="Save" onPress={() => uploadImage()}>
                //               <Text>Share</Text>
                // {/* <MaterialCommunityIcons name="camera-party-mode" color="#ffffff" size={32} /> */}
                //   </TouchableOpacity>
                //           )
              }}
            />
            <Stack.Screen
              name="NewDictionary"
              component={NewDictionaryScreen}
              navigation={this.props.navigation}
              options={{
                title: "Upload a Word",
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                },
              }}
            />

            <Stack.Screen
              name="MyContribution"
              component={MyContributionsScreen}
              options={{
                title: "My Contributions",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />

            <Stack.Screen
              name="Validate"
              component={ValidateWordScreen}
              options={{
                title: "Validate Submissions",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />
            <Stack.Screen
              name="Validation"
              component={ValidationScreen}
              options={{
                title: "Validation",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />
            <Stack.Screen
              name="ConfirmScreen"
              component={ApplicationConfScreen}
              options={{
                title: "Validator Confirmation",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />

            <Stack.Screen
              name="ApplicationScreen"
              component={ApplicationsScreen}
              options={{
                title: "Validator Applicants",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />

            <Stack.Screen
              name="Decline"
              component={DeclineScreen}
              options={{
                title: "Decline",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />
            <Stack.Screen
              name="ValidatorScreen"
              component={BeAValidatorScreen}
              options={{
                title: "Be A Validator",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />

            <Stack.Screen
              name="ValAppScreen"
              component={ValidatorAppScreen}
              options={{
                title: "Validator Application",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />
            <Stack.Screen
              name="UserContribution"
              component={UserContributionScreen}
              options={{
                title: "My Contribution",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />

            <Stack.Screen
              name="AddLanguageScreen"
              component={AddLanguageScreen}
              options={{
                title: "Add Language",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />
            <Stack.Screen
              name="AddQuestion"
              component={AddQuestion}
              options={{
                title: "Questions",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />
            <Stack.Screen
              name="AddQuiz"
              component={AddQuiz}
              options={{
                title: "AddQuiz",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />
            <Stack.Screen
              name="EditQuestion"
              component={EditQuestion}
              options={{
                title: "EditQuestion",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />

            <Stack.Screen
              name="Testpage"
              component={Testpage}
              options={{
                title: "Testpage",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />

            <Stack.Screen
              name="PlayQuizScreen"
              component={PlayQuizScreen}
              options={{
                title: "PlayQuizScreen",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />

            <Stack.Screen
              name="Edit"
              component={Edit}
              options={{
                title: "Edit",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />

            <Stack.Screen
              name="Edits"
              component={Edits}
              options={{
                title: "Edits",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />

            <Stack.Screen
              name="Add"
              component={Add}
              options={{
                title: "Add",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />

            <Stack.Screen
              name="AddEdit"
              component={AddEdit}
              options={{
                title: "Add&Edit",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />

            <Stack.Screen
              name="AddQuestions"
              component={AddQuestions}
              options={{
                title: "AddQuestions",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />

            <Stack.Screen
              name="AddQuest"
              component={AddQuest}
              options={{
                title: "AddQuestions",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />

            <Stack.Screen
              name="EditAbout"
              component={EditAbout}
              options={{
                title: "EditAbout",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />

            <Stack.Screen
              name="EditEvent"
              component={EditEvent}
              options={{
                title: "EditEvent",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />

            <Stack.Screen
              name="EditEvents"
              component={EditEvents}
              options={{
                title: "EditEvents",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />

            <Stack.Screen
              name="AddAbout"
              component={AddAbout}
              options={{
                title: "About",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />

            <Stack.Screen
              name="EditTraditions"
              component={EditTraditions}
              options={{
                title: "EditTradition",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />

            <Stack.Screen
              name="EditFood"
              component={EditFood}
              options={{
                title: "Food",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />

            <Stack.Screen
              name="AddFood"
              component={AddFood}
              options={{
                title: "Food",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />

            <Stack.Screen
              name="EditFoods"
              component={EditFoods}
              options={{
                title: "Food",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />

            <Stack.Screen
              name="EditClothing"
              component={EditClothing}
              options={{
                title: "Clothings",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />

            <Stack.Screen
              name="EditClothings"
              component={EditClothings}
              options={{
                title: "Clothings",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />

            <Stack.Screen
              name="AddClothings"
              component={AddClothings}
              options={{
                title: "Clothing",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />

<Stack.Screen
              name="EditCulture"
              component={EditCulture}
              options={{
                title: "Culture",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />

            <Stack.Screen
              name="EditCultures"
              component={EditCultures}
              options={{
                title: "Culture",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />

            <Stack.Screen
              name="AddCulture"
              component={AddCulture}
              options={{
                title: "Culture",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />
            
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  capture: {
    //position: "relative",
    //bottom: 100,
    right: 10,
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "#263238",
    borderWidth: 6,
    alignSelf: "center",
  },
});
