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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
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
  const { data } =route?.params?? {}
  
  console.log(language);
  console.log(data?.downloadURL)

  const [currentQuizId, setcurrentQuizId] = useState(
    route.params.currentQuizId
  );
  const [currentQuizTitle, setcurrentQuizTitle] = useState(
    route.params.currentQuizTitle
  );

  const [question, setQuestion] = useState("");

  const [correctAnswer, setCorrectAnswer] = useState("");
  const [OptionTwo, setOptionTwo] = useState("");
  const [OptionThree, setOptionThree] = useState("");
  const [OptionFour, setOptionFour] = useState("");
  // const audio= data?.downloadURL 
  // const [audio1, setAudio] = useState(audio)
  // console.log(audio1)
  const handleQuestionSave = async () => {
    if (
      question == "" ||
      correctAnswer == "" ||
      OptionTwo == "" ||
      OptionThree == "" ||
      OptionFour == ""
    ) {
      return;
    }

    let currentQuestionId = Math.floor(
      100000 + Math.random() * 9000
    ).toString();
  console.log(currentQuestionId);
    // Add question to db
    await createQuestion(currentQuizId, currentQuestionId, {
      audio: data?.downloadURL,
      question: question,
      correct_answer: correctAnswer,
      incorrect_answers: [OptionTwo, OptionThree, OptionFour],
    });

    // Reset

    setQuestion("");
    setCorrectAnswer("");
    setOptionTwo("");
    setOptionThree("");
    setOptionFour("");
    navigation.navigate("AddSpeechQuiz2", {
                currentQuizId: currentQuizId,
                currentQuizTitle: currentQuizTitle,
                language: language,
              })
  };

  const createQuestion = (currentQuizId, currentQuestionId, question) => {
    return firebase
      .firestore()
      .collection("languages")
      .doc(language)
      .collection("SpeechQuiz")
      .doc(currentQuizId)
      .collection("QNA")
      .doc(currentQuestionId)
      .set(question);
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}
      >
        <View style={{ padding: 20 }}>
          <Text
            style={{ fontSize: 20, textAlign: "center", color: COLORS.black }}
          >
            Add Question
          </Text>

          <TouchableOpacity
            style={styles.buttonVocab}
            onPress={() => navigation.navigate("AudioList", {language : language})}
          >
           { data?.downloadURL ? ( <MaterialCommunityIcons
                    style={styles.addAudio}
                    name="volume-high"
                    color={"#707070"}
                    size={26}
                  />) :(<View style={styles.contextButton}>
              <View style={styles.text_Context}>
                <Text style={styles.textVocab}>Add Audio</Text>
              </View>
            </View>) } 
           
          </TouchableOpacity>

          <Text style={{ textAlign: "center", marginBottom: 20 }}>
            For {currentQuizTitle}
          </Text>

          <FormInput
            labelText="Question"
            placeholderText="enter question"
            onChangeText={(val) => setQuestion(val)}
            value={question}
          />

          {/* Image upload */}

          {/* Options */}
          <View style={{ marginTop: 30 }}>
            <FormInput
              labelText="Correct Answer"
              onChangeText={(val) => setCorrectAnswer(val)}
              value={correctAnswer}
            />
            <FormInput
              labelText="Option 2"
              onChangeText={(val) => setOptionTwo(val)}
              value={OptionTwo}
            />
            <FormInput
              labelText="Option 3"
              onChangeText={(val) => setOptionThree(val)}
              value={OptionThree}
            />
            <FormInput
              labelText="Option 4"
              onChangeText={(val) => setOptionFour(val)}
              value={OptionFour}
            />
          </View>
          <FormButton
            labelText="Add Question"
            handleOnPress={ handleQuestionSave}
          />
          <FormButton
            labelText="Done & Go Home"
            isPrimary={false}
            handleOnPress={() => {
              setcurrentQuizId("");
              navigation.navigate("Course");
            }}
            style={{
              marginVertical: 20,
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddQuestion;
const styles = StyleSheet.create({
  buttonVocab: {
    width: "47.5%",
    elevation: 0.7,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingVertical: 15,
    margin: 5,

  },
  textVocab: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  contextButton: {
    flexDirection: "column",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  text_Context: {
    flexDirection: "column",
    alignItems: "center",
  },
});

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

