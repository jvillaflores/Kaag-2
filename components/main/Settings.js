import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";

import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "firebase/app";
require("firebase/auth");
import { connect } from "react-redux";

const onLogout = () => {
  firebase.auth().signOut();
};

function Settings({ currentUser, navigation, route }) {
  const { language } = route?.params ?? {};
  if (currentUser.type == "2") {
    // This will render all of the functions available for the superuser
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.userInfoSelection}>
            <View>
              <Title style={[styles.title, { marginTop: 35, marginBottom: 5 }]}>
                {currentUser.name}
              </Title>
            </View>
          </View>
        </View>
        {/* Active user contribution (start)*/}
        <View style={styles.menuWrapper}>
          <TouchableRipple
            onPress={() =>
              navigation.navigate("MyContribution", { language: language })
            }
          >
            <View style={styles.menuItem}>
              <Icon name="folder-outline" color="#777777" size={25} />
              <Text style={styles.menuItemText}>My Contributions</Text>
            </View>
          </TouchableRipple>
          {/* Active user contribution (end)*/}

          {/* Validator Application screen (start)*/}
          <TouchableRipple
            onPress={() => navigation.navigate("ApplicationScreen")}
          >
            <View style={styles.menuItem}>
              <Icon name="folder-account" color="#777777" size={25} />
              <Text style={styles.menuItemText}>Applications</Text>
            </View>
          </TouchableRipple>
          {/* Validator Application screen (end)*/}

          {/* Word Validation screen (start)*/}
          <TouchableRipple
            onPress={() =>
              navigation.navigate("Validate", { language: language })
            }
          >
            <View style={styles.menuItem}>
              <Icon
                name="checkbox-marked-circle-outline"
                color="#777777"
                size={25}
              />
              <Text style={styles.menuItemText}>Check Submissions</Text>
            </View>
          </TouchableRipple>
          {/* Word Validation screen (end)*/}

          {/* Add Language screen (start)*/}
          <TouchableRipple
            onPress={() => navigation.navigate("AddLanguageScreen")}
          >
            <View style={styles.menuItem}>
              <Icon name="database-plus" color="#777777" size={25} />
              <Text style={styles.menuItemText}>Add New Language</Text>
            </View>
          </TouchableRipple>
          {/* Add Language screen (end)*/}

          {/* Language List screen (start)*/}
          <TouchableRipple onPress={() => navigation.navigate("Language")}>
            <View style={styles.menuItem}>
              <Icon name="bookshelf" color="#777777" size={25} />
              <Text style={styles.menuItemText}>Languages</Text>
            </View>
          </TouchableRipple>
          {/* Language List screen (end)*/}

          {/*Add Quiz */}
          <TouchableRipple
            onPress={() =>
              navigation.navigate("AddQuestion", { language: language })
            }
          >
            <View style={styles.menuItem}>
              <Icon name="head-question" color="#777777" size={25} />
              <Text style={styles.menuItemText}>Questions</Text>
            </View>
          </TouchableRipple>
          {/*Add Quiz (end)*/}
          {/* TestPage 
          <TouchableRipple onPress={() => navigation.navigate("Testpage", { language: language })}>
            <View style={styles.menuItem}>
              <Icon name="bookshelf" color="#777777" size={25} />
              <Text style={styles.menuItemText}>TestPage</Text>
            </View>
          </TouchableRipple>
          */}

          {/* Edit Quiz screen (start)*/}
          <TouchableRipple
            onPress={() =>
              navigation.navigate("AddEdit", { language: language })
            }
          >
            <View style={styles.menuItem}>
              <Icon name="pencil" color="#777777" size={25} />
              <Text style={styles.menuItemText}>Edit Questions</Text>
            </View>
          </TouchableRipple>
          {/* Edit Quiz screen (end)*/}

          {/* Edit About screen (start)*/}
          <TouchableRipple
            onPress={() =>
              navigation.navigate("EditAbout", { language: language })
            }
          >
            <View style={styles.menuItem}>
              <Icon name="book" color="#777777" size={25} />
              <Text style={styles.menuItemText}>Edit About</Text>
            </View>
          </TouchableRipple>
          {/* Edit About screen (end)*/}



          <TouchableRipple onPress={() => onLogout()}>
            <View style={styles.menuItem}>
              <Icon name="logout" color="#777777" size={25} />
              <Text style={styles.menuItemText}>Logout</Text>
            </View>
          </TouchableRipple>
        </View>
      </SafeAreaView>
    );
  } else if (currentUser.type == "1") {
    if (
      currentUser.userLanguage == language ||
      currentUser.secondLanguage == language ||
      currentUser.thirdLanguage == language
    ) {
      // This will render all of the functions available for the validator user and;
      // has a secondary conditionthat if satisfied will render Check Submissions button
      return (
        <SafeAreaView style={styles.container}>
          <View>
            <View style={styles.userInfoSelection}>
              <View>
                <Title
                  style={[styles.title, { marginTop: 35, marginBottom: 5 }]}
                >
                  {currentUser.name}
                </Title>
              </View>
            </View>
          </View>

          <View style={styles.menuWrapper}>
            <TouchableRipple
              onPress={() =>
                navigation.navigate("MyContribution", { language: language })
              }
            >
              <View style={styles.menuItem}>
                <Icon name="folder-outline" color="#777777" size={25} />
                <Text style={styles.menuItemText}>My Contributions</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => navigation.navigate("Language")}>
              <View style={styles.menuItem}>
                <Icon name="bookshelf" color="#777777" size={25} />
                <Text style={styles.menuItemText}>Languages</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple
              onPress={() =>
                navigation.navigate("Validate", { language: language })
              }
            >
              <View style={styles.menuItem}>
                <Icon
                  name="checkbox-marked-circle-outline"
                  color="#777777"
                  size={25}
                />
                <Text style={styles.menuItemText}>Check Submissions</Text>
              </View>
            </TouchableRipple>

            <TouchableRipple onPress={() => onLogout()}>
              <View style={styles.menuItem}>
                <Icon name="logout" color="#777777" size={25} />
                <Text style={styles.menuItemText}>Logout</Text>
              </View>
            </TouchableRipple>
          </View>
        </SafeAreaView>
      );
    } else {
      // This will render all of the functions available for the validator user and;
      // secondary condtion not satisfied therefore check submissions will not render
      return (
        <SafeAreaView style={styles.container}>
          <View>
            <View style={styles.userInfoSelection}>
              <View>
                <Title
                  style={[styles.title, { marginTop: 35, marginBottom: 5 }]}
                >
                  {currentUser.name}
                </Title>
              </View>
            </View>
          </View>

          <View style={styles.menuWrapper}>
            <TouchableRipple
              onPress={() =>
                navigation.navigate("MyContribution", { language: language })
              }
            >
              <View style={styles.menuItem}>
                <Icon name="folder-outline" color="#777777" size={25} />
                <Text style={styles.menuItemText}>My Contributions</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => navigation.navigate("Language")}>
              <View style={styles.menuItem}>
                <Icon name="bookshelf" color="#777777" size={25} />
                <Text style={styles.menuItemText}>Languages</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => onLogout()}>
              <View style={styles.menuItem}>
                <Icon name="logout" color="#777777" size={25} />
                <Text style={styles.menuItemText}>Logout</Text>
              </View>
            </TouchableRipple>
          </View>
        </SafeAreaView>
      );
    }
  } else {
    // This will render the Basic users functions
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.userInfoSelection}>
            <View>
              <Title style={[styles.title, { marginTop: 35, marginBottom: 5 }]}>
                {currentUser.name}
              </Title>
            </View>
          </View>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableRipple
            onPress={() =>
              navigation.navigate("MyContribution", { language: language })
            }
          >
            <View style={styles.menuItem}>
              <Icon name="folder-outline" color="#777777" size={25} />
              <Text style={styles.menuItemText}>My Contributions</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple
            onPress={() =>
              navigation.navigate("ValidatorScreen", { language: language })
            }
          >
            <View style={styles.menuItem}>
              <Icon name="account-tie" color="#777777" size={25} />
              <Text style={styles.menuItemText}>Be A Validator</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => navigation.navigate("Language")}>
            <View style={styles.menuItem}>
              <Icon name="bookshelf" color="#777777" size={25} />
              <Text style={styles.menuItemText}>Languages</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => onLogout()}>
            <View style={styles.menuItem}>
              <Icon name="logout" color="#777777" size={25} />
              <Text style={styles.menuItemText}>Logout</Text>
            </View>
          </TouchableRipple>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 30,
  },
  userInfoSelection: {
    // paddingHorizontal: 30,
    marginTop: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },

  menuWrapper: {
    marginTop: 10,
  },

  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
