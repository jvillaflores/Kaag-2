import React, { Component } from "react";
import { View, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions/index";
import { NavigationContainer } from "@react-navigation/native";

import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import EditProfileScreen from "./main/EditProfileScreen";
const ProfileStack = createStackNavigator();

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Tab = createMaterialBottomTabNavigator();
const EmptyScreen = () => {
  return null;
};
// import { LogBox } from "react-native";
// import _ from "lodash";

// LogBox.ignoreLogs(["Warning:..."]); // ignore specific logs
// LogBox.ignoreAllLogs(); // ignore all logs
// const _console = _.clone(console);
// console.warn = (message) => {
//   if (message.indexOf("Setting a timer") <= -1) {
//     _console.warn(message);
//   }
// };
import CourseScreen from "./main/Course";
import DictionaryScreen from "./main/Dictionary";
import CommunityScreen from "./main/Community";
import ContributeDictionary from "./main/ContributeDictionary";
import ProfileScreen from "./main/Settings";
// import data from "./main/coursepacks/quizdata/Vocabulary/QuizData3";
// import { FirstScreenNavigator } from "../CustomNavigation";

export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { language } = this.props.route.params;
    console.log(language);

    return (
      <Tab.Navigator
        initialRouteName="Course"
        labeled={false}
        activeColor="#215A88"
        inactiveColor="#B2B2B2"
        barStyle={{ backgroundColor: "#f2f2f2" }}
      >
        <Tab.Screen
          name="Course"
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("Course", { language: language });
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
          children={(props) => <CourseScreen language={language} {...props} />}
        />
        <Tab.Screen
          name="Dictionary"
          component={DictionaryScreen}
          //navigation = {this.props.navigation}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("Dictionary", { language: language });
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="book-open-page-variant"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Community"
          component={CommunityScreen}
          //navigation = {this.props.navigation}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("Community", { language: language });
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-group"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="ContributeDictionary"
          component={ContributeDictionary}
          //navigation = {this.props.navigation}
          //to pass along the props inside it and make it easier the logic from the profile screen perspective
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("ContributeDictionary", {
                language: language,
              });
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="upload" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={ProfileScreen}
          //navigation = {this.props.navigation}
          //to pass along the props inside it and make it easier the logic from the profile screen perspective
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("Settings", { language: language });
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
// const ProfileStackScreen = ({ navigation, route }) => {
//   // const {colors} = useTheme();
//   const { language } = route?.params ?? {};
//   console.log(language);

//   return (
//     <ProfileStack.Navigator
//       screenOptions={{
//         headerStyle: {
//           //backgroundColor: colors.background,
//           //shadowColor: colors.background, // iOS
//           elevation: 0, // Android
//         },
//         //headerTintColor: colors.text,
//       }}
//     >
//       <ProfileStack.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           headerStyle: {
//             backgroundColor: "#f2f2f2",
//             elevation: 0,
//             borderBottomWidth: 0,
//           },

//           title: "",
//           headerRight: () => (
//             <View style={{ marginRight: 10 }}>
//               <MaterialCommunityIcons.Button
//                 name="account-edit"
//                 size={25}
//                 backgroundColor="#f2f2f2"
//                 color="#777777"
//                 onPress={() => navigation.navigate("EditProfile")}
//               />
//             </View>
//           ),
//         }}
//       />
//       <ProfileStack.Screen
//         name="EditProfile"
//         options={{
//           title: "Edit Profile",
//           headerStyle: {
//             backgroundColor: "#f2f2f2",
//             elevation: 0,
//             borderBottomWidth: 0,
//           },
//         }}
//         component={EditProfileScreen}
//       />
//     </ProfileStack.Navigator>
//   );
// };

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      fetchUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(Main);
