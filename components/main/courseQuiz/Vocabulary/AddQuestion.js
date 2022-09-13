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
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

{
  /* Form Input */
}
export const FormInput = ({
  labelText = "",
  placeholderText = "",
  onChangeText = null,
  value = null,
  ...more
}) => {
  return (
    <View style={{ width: "100%", marginBottom: 20 }}>
      <Text>{labelText}</Text>
      <TextInput
        style={{
          padding: 10,
          borderColor: COLORS.black + "20",
          borderWidth: 1,
          width: "100%",
          borderRadius: 5,
          marginTop: 10,
        }}
        placeholder={placeholderText}
        onChangeText={onChangeText}
        value={value}
        {...more}
      />
    </View>
  );
};

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

const AddQuestion = ({ navigation, route }) => {
  const { language } = route.params;
  console.log(language);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createQuiz = (currentQuizId, title, description) => {
    return firebase
      .firestore()
      .collection("languages")
      .doc(language)
      .collection("Quizzes")
      .doc(currentQuizId)
      .set({
        title,
        description,
      });
  };

  const handleQuizSave = async () => {
    const currentQuizId = Math.floor(100000 + Math.random() * 9000).toString();
    // Save to firestore
    await createQuiz(currentQuizId, title, description);

    // Navigate to Add Question string
    navigation.navigate("AddQuiz", {
      currentQuizId: currentQuizId,
      currentQuizTitle: title,
      language: language,
    });

    // Reset
    setTitle("");
    setDescription("");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
          marginVertical: 20,
          fontWeight: "bold",
          color: COLORS.black,
        }}
      >
        Create Quiz
      </Text>

      <FormInput
        labelText="Title"
        placeholderText="enter quiz title"
        onChangeText={(val) => setTitle(val)}
        value={title}
      />
      <FormInput
        labelText="Description"
        placeholderText="enter quiz description"
        onChangeText={(val) => setDescription(val)}
        value={description}
      />

      <FormButton labelText="Create Quiz" handleOnPress={handleQuizSave} />

      {/* Temporary button - navigate without saving quiz*/}
      {/* <FormButton
        labelText="Navigate to AddQuestionScreen"
        style={{
          marginVertical: 20,
        }}
        handleOnPress={() => {
          navigation.navigate('AddQuestionScreen', {
            currentQuizId: '103404',
            currentQuizTitle: 'Demo quiz',
          });
        }}
      /> */}
    </SafeAreaView>
  );
};

export default AddQuestion;
const COLORS = {
  primary: "#215a88",
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
