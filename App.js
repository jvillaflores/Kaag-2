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
  apiKey: "AIzaSyAjzdVDiocEbhoPYZHZu8V2o3jKhrqqXPU",
  authDomain: "project-kaag-357101.firebaseapp.com",
  projectId: "project-kaag-357101",
  storageBucket: "project-kaag-357101.appspot.com",
  messagingSenderId: "588978127054",
  appId: "1:588978127054:web:f1b1df43e9e77ef528d09f",
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
// import VocabularyScreen from "./components/main/Vocabulary";
import GrammarScreen from "./components/main/Grammar";
import WordScreen from "./components/main/Word";
import SaveScreen from "./components/main/Save";
import DeleteContributionScreen from "./components/main/DeleteContribution";

import MyContributionsScreen from "./components/main/userContributions/MyContributions";
import BeAValidatorScreen from "./components/main/BeAValidator";
import ValidatorAppScreen from "./components/main/ValidatorApplication";
import ValidationScreen from "./components/main/Validation";
import ValidateWordScreen from "./components/main/wordValidation/ValidateWord";
import DeclineScreen from "./components/main/Decline";
import ApplicationsScreen from "./components/main/userValidation/Applications";
import ApplicationConfScreen from "./components/main/ApplicationConf";
import VocabEditQuestion from "./components/main/courseQuiz/Vocabulary/VocabEditQuestion"
import ImageValidation from "./components/main/imageValidation/imageValidation"
import ValidateImage from "./components/main/imageValidation/ValidateImage";
// import SpeechScreen from "./components/main/Speech";
import UserContributionScreen from "./components/main/UserContribution";
import CultureScreen from "./components/main/AboutCulture";
import FoodScreen from "./components/main/AboutFood";
import EventsScreen from "./components/main/AboutEvents";
import TraditionScreen from "./components/main/Traditions";
import ClothingScreen from "./components/main/AboutClothing";
import AddLanguageScreen from "./components/main/AddLanguage";
import AddSpeechQuiz from "./components/main/courseQuiz/Speech/AddQuiz";
import AddSpeechQuiz2 from "./components/main/courseQuiz/Speech/AddQuiz2";
import AddQuiz from "./components/main/courseQuiz/Vocabulary/AddQuiz";
import AddQuestion from "./components/main/courseQuiz/Vocabulary/AddQuestion";
import AddAnotherQuestion from "./components/main/courseQuiz/Speech/EdAddQuestion"
import SPAddQ from "./components/main/courseQuiz/Speech/SPAddQ";
import AudioList from "./components/main/courseQuiz/Speech/AudioList";
import AudioList2 from "./components/main/courseQuiz/Speech/AudioList2";
import AudioList3 from "./components/main/courseQuiz/Speech/AudioList3";
import AudioList4 from "./components/main/courseQuiz/Speech/AudioList4";
import OptionQuiz from "./components/main/courseQuiz/OptionQuiz";
import AboutKAAGScreen from "./components/main/AboutKAAG";
import EditOptionQuiz from "./components/main/courseQuiz/EditOptionQuiz";
import EditSpeechQuizList from "./components/main/courseQuiz/Speech/EditQuizList";
import EditVocabQuizList from "./components/main/courseQuiz/Vocabulary/EditQuizList";
import EditSpeechQuestionsList from "./components/main/courseQuiz/Speech/EditQuestionsList";
import EditVocabQuestionsList from "./components/main/courseQuiz/Vocabulary/EditQuestionsList";
import Vocabulary from "./components/main/courseQuiz/VocabularyQuiz"
import SpeechQuiz from "./components/main/courseQuiz/SpeechQuiz";
import PlaySpeechQuizScreen from "./components/main/courseQuiz/Speech/PlayQuizScreen";
import PlayVocabularyQuizScreen from "./components/main/courseQuiz/Vocabulary/PlayQuizScreen";
import Edit from "./components/main/Edit";
import Edits from "./components/main/Edits";
import Add from "./components/main/Add";
import AddEdit from "./components/main/AddEdit";
import AddQuestions from "./components/main/AddQuestions";

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
import AgainContrib from "./components/main/AgainContrib";
import Consent from "./components/main/Consent";

import DeleteAbout from "./components/main/CultureFlatList/DeleteAbout";
import DeleteImageScreen from "./components/main/DeleteImageScreen";
import EditSpeechQuestionItem from "./components/main/courseQuiz/Speech/EditQuestion";
import EditVocabQuestionItem from "./components/main/courseQuiz/Vocabulary/EditQuestion";
import EditAudioList from "./components/main/courseQuiz/Speech/EditAudioList";
import EditAddSpeechQuestionItem from "./components/main/courseQuiz/Speech/EditAddQuestionItem";
import EditAddSpeechQuestionItem2 from "./components/main/courseQuiz/Speech/EditAddSpeechQuestionItem2";
import EditAddVocabularyQuestion from "./components/main/courseQuiz/Vocabulary/EditAddQuestion";

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
            {/* <Stack.Screen
              name="Vocabulary"
              component={VocabularyScreen}
              options={{
                title: "Vocabulary",
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                },
              }}
            /> */}
            {/* <Stack.Screen
              name="Speech"
              component={SpeechScreen}
              options={{
                title: "Speech",
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                },
              }}
            /> */}

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
            {/* <Stack.Screen
              name="NewDictionary"
              component={NewDictionaryScreen}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <View style={{ marginLeft: 10 }}>
                    <MaterialCommunityIcons
                      name="arrow-left"
                      color={"#ffffff"}
                      size={25}
                      onPress={() => {
                        navigation.navigate("Course");
                      }}
                    />
                  </View>
                ),
                title: "Upload a Word",
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                },
              })}
            />
            <Stack.Screen
              name="NewDictionaryReRender"
              component={NewDictionaryReRenderScreen}
              navigation={this.props.navigation}
              options={{
                title: "Upload a Word",
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                },
              }}
            /> */}
            <Stack.Screen
              name="Consent"
              component={Consent}
              navigation={this.props.navigation}
              options={{
                title: "Consent",
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                },
              }}
            />

            {/* <Stack.Screen
              name="NewConsent"
              component={NewConsent}
              navigation={this.props.navigation}
              options={{
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                },
              }}
            /> */}

            <Stack.Screen
              name="AgainContrib"
              component={AgainContrib}
              navigation={this.props.navigation}
              options={{
                title: " ",
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
              name="ImageValidation"
              component={ImageValidation}
              options={{
                title: "Image Validation",
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
              name="ValidateImage"
              component={ValidateImage}
              options={{
                title: "Image Validation",
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
              name="Delete"
              component={DeleteContributionScreen}
              options={{
                title: "Delete Contribution",
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
              name="DeleteAbout"
              component={DeleteAbout}
              options={{
                title: "Delete",
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
              name="DeleteImageScreen"
              component={DeleteImageScreen}
              options={{
                title: "Delete Contribution",
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
              name="AboutKAAGScreen"
              component={AboutKAAGScreen}
              options={{
                title: "About KAAG",
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
              name="AddSpeechQuiz"
              component={AddSpeechQuiz}
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
              name="AddSpeechQuiz2"
              component={AddSpeechQuiz2}
              options={{
                title: "AddQuiz2",
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
              name="AudioList"
              component={AudioList}
              options={{
                title: "Audio List",
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
              name="AudioList2"
              component={AudioList2}
              options={{
                title: "Audio List",
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
              name="AudioList3"
              component={AudioList3}
              options={{
                title: "Audio List",
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
              name="AudioList4"
              component={AudioList4}
              options={{
                title: "Audio List",
                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#215A88",
                  elevation: 0,
                  borderBottomWidth: 0,
                },
              }}
            />
            {/* <Stack.Screen
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
            /> */}
            <Stack.Screen
              name="EditOptionQuiz"
              component={EditOptionQuiz}
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
              name="EditSpeechQuiz"
              component={EditSpeechQuizList}
              options={{
                title: "Edit Question",
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
              name="EditVocabQuiz"
              component={EditVocabQuizList}
              options={{
                title: "Edit Question",
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
              name="AddAnotherQuestion"
              component={AddAnotherQuestion}
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
              name="VocabEditQuestion"
              component={VocabEditQuestion}
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
              name="EditSpeechQuestion"
              component={EditSpeechQuestionsList}
              options={{
                title: "Edit Question",
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
              name="EditSpeechQuestionItem"
              component={EditSpeechQuestionItem}
              options={{
                title: "Edit Question",
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
              name="EditAudioList"
              component={EditAudioList}
              options={{
                title: "Edit Question",
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
              name="EditAddSpeechQuestionItem"
              component={EditAddSpeechQuestionItem}
              options={{
                title: "Edit Question",
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
              name="EditAddSpeechQuestionItem2"
              component={EditAddSpeechQuestionItem2}
              options={{
                title: "Edit Question",
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
              name="EditVocabQuestionItem"
              component={EditVocabQuestionItem}
              options={{
                title: "Edit Question",
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
              name="EditVocabQuestion"
              component={EditVocabQuestionsList}
              options={{
                title: "Edit Question",
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
              name="EditAddVocabularyQuestion"
              component={EditAddVocabularyQuestion}
              options={{
                title: "Edit Question",
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
              name="Vocabulary"
              component={Vocabulary}
              options={{
                title: "Vocabulary",
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
              name="SpeechQuiz"
              component={SpeechQuiz}
              options={{
                title: "Speech",
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
              name="OptionQuiz"
              component={OptionQuiz}
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
              name="SpeechAddQuiz"
              component={SPAddQ}
              options={{
                title: "Add Quiz",
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
              name="PlaySpeechQuizScreen"
              component={PlaySpeechQuizScreen}
              options={{
                title: "Vocabulary",
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
              name="PlayVocabularyQuizScreen"
              component={PlayVocabularyQuizScreen}
              options={{
                title: "Vocabulary",
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

            {/* <Stack.Screen
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
            /> */}

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
                title: " ",
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
