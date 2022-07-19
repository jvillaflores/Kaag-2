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
} from "react-native";
import React, { useState, useEffect } from "react";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

const Testpage = ({ navigation, route }) => {
  const { language } = route?.params ?? {};

  const [allQuizzes, setAllQuizzes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getQuizzes = () => {
    return firebase
      .firestore()
      .collection("languages")
      .doc(language)
      .collection("Quizzes")
      .get();
  };

  const getAllQuizzes = async () => {
    setRefreshing(true);
    const quizzes = await getQuizzes();

    // Transform quiz data
    let tempQuizzes = [];
    await quizzes.docs.forEach(async (quiz) => {
      await tempQuizzes.push({ id: quiz.id, ...quiz.data() });
    });
    await setAllQuizzes([...tempQuizzes]);

    setRefreshing(false);
  };

  useEffect(() => {
    getAllQuizzes();
  }, []);

  return (
    <FlatList
      data={allQuizzes}
      onRefresh={getAllQuizzes}
      refreshing={refreshing}
      showsVerticalScrollIndicator={false}
      style={{
        paddingVertical: 20,
      }}
      renderItem={({ item: quiz }) => (
        <View
          style={{
            padding: 20,
            borderRadius: 5,
            marginVertical: 5,
            marginHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: COLORS.white,
            elevation: 2,
          }}
        >
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text style={{ fontSize: 18, color: COLORS.black }}>
              {quiz.title}
            </Text>
            {quiz.description != "" ? (
              <Text style={{ opacity: 0.5 }}>{quiz.description}</Text>
            ) : null}
          </View>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              paddingHorizontal: 30,
              borderRadius: 50,
              backgroundColor: COLORS.primary + "20",
            }}
            onPress={() => {
              navigation.navigate("PlayQuizScreen", {
                quizId: quiz.id,
                language: language,
              });
            }}
          >
            <Text style={{ color: COLORS.primary }}>Play</Text>
          </TouchableOpacity>

          
        </View>
      )}
    />
  );
};

export default Testpage;
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
