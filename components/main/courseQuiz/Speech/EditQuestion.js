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
  import { Audio } from "expo-av";
  import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
  

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
  
  const EditQuestion = ({ route,navigation }) => {
    const { language } = route?.params ?? {};
    const { currentData } = route?.params ?? {};
    const { data } = route?.params ?? {};
    const { item } = route?.params ?? {};
  
    const [question, setQuestion] = useState(currentData?.question);
    const [correctAnswer, setCorrectAnswer] = useState(
      currentData?.correct_answer
    );
    const [OptionTwo, setOptionTwo] = useState(currentData?.incorrect_answers[0]);
    const [OptionThree, setOptionThree] = useState(
      currentData?.incorrect_answers[1]
    );
    const [OptionFour, setOptionFour] = useState(
      currentData?.incorrect_answers[2]
    );
  
    const handleQuestionSave = () => {
      createQuestion();
    };
    const handleAudioSave = () => {
      updateAudio();
    };
    const handleQuestionDelete = () => {
      deleteQuestion();
    }
    const downloadAudio = async () => {
      //function for playing the audio of the dictionary data
     
      let SoundObject = new Audio.Sound();
      try {
        
        await SoundObject.loadAsync({ uri: currentData.audio });
        const status = await SoundObject.playAsync();
        setTimeout(() => {
          SoundObject.unloadAsync();
        }, status.playableDurationMillis + 1000);
      } catch (error) {
       
        await SoundObject.unloadAsync(); // Unload any sound loaded
        SoundObject.setOnPlaybackStatusUpdate(null); // Unset all playback status loaded
        retryPlaySound();
      }
    };
  
    const retryPlaySound = () => downloadAudio();
    const chooseFile = async () => {
      let result = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
        copyToCacheDirectory: false,
      });
      // Alert.alert("Audio File", result.name);
  
      
      if (result.type === "success") {
        setAudio(result);
      } else {
        alert("Please choose a file.");
      }
    };
    const createQuestion = () => {
      return firebase
        .firestore()
        .collection("languages")
        .doc(language)
        .collection("SpeechQuiz")
        .doc(`${data?.id}`)
        .collection("QNA")
        .doc(`${currentData?.id}`)
        .update({
          question,
          correct_answer: correctAnswer,
          incorrect_answers: [OptionTwo, OptionThree, OptionFour],
        })
  
        .then(() => {
          alert("Question updated!");
        });
    };
    const updateAudio = () => {
      return firebase
        .firestore()
        .collection("languages")
        .doc(language)
        .collection("SpeechQuiz")
        .doc(`${data?.id}`)
        .collection("QNA")
        .doc(`${currentData?.id}`)
        .update({
          question,
          audio: item.downloadURL,
          correct_answer: correctAnswer,
          incorrect_answers: [OptionTwo, OptionThree, OptionFour],
        })
  
        .then(() => {
          alert("Question updated!");
        });
    };
    
    const deleteQuestion = () => {
      return firebase
      .firestore()
      .collection("languages")
      .doc(language)
      .collection("SpeechQuiz")
      .doc(`${data?.id}`)
      .collection("QNA")
      .doc(`${currentData?.id}`)
      .delete()
      .then((result) => {
        alert("Question Permanently Deleted!");
        navigation.pop();
        setLoading(false);
      })
      .catch((err) => console.log(err, "-=error"));
    }
  
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
              Edit Question
            </Text>
            <Text style={{ textAlign: "center", marginBottom: 20 }}>
              For {data?.title}
            </Text>
            <View>
              <Pressable onPress={() => navigation.navigate("EditAudioList", {language : language})}>
                <Text style={styles.edit_audio}> Change Audio </Text>
              </Pressable>
            </View>
            <TouchableOpacity
                      style={styles.buttonAudio}
                      onPress={() => downloadAudio(data)}
                      >
                      
                      <View>
                        <MaterialCommunityIcons
                          name="volume-high"
                          size={26}
                          color="#215a88"
                        />
                      </View>
                    </TouchableOpacity>
            <FormInput
              labelText="Question"
              placeholderText={question}
              onChangeText={(val) => setQuestion(val)}
              value={question}
            />
  
            {/* Image upload */}
  
            {/* Options */}
            <View style={{ marginTop: 30 }}>
              <FormInput
                labelText="Correct Answer"
                placeholderText={correctAnswer}
                onChangeText={(val) => setCorrectAnswer(val)}
                value={correctAnswer}
              />
              <FormInput
                labelText="Option 2"
                placeholderText={OptionTwo}
                onChangeText={(val) => setOptionTwo(val)}
                value={OptionTwo}
              />
              <FormInput
                labelText="Option 3"
                placeholderText={OptionThree}
                onChangeText={(val) => setOptionThree(val)}
                value={OptionThree}
              />
              <FormInput
                labelText="Option 4"
                placeholderText={OptionFour}
                onChangeText={(val) => setOptionFour(val)}
                value={OptionFour}
              />
            </View>
  
            <FormButton
              labelText="Save Question"
              handleOnPress={handleQuestionSave}
            />
            <FormButton
              labelText="Update Audio and Save"
              handleOnPress={handleAudioSave}
              style={{
                marginTop: 10,
              }}
            />
             <FormButton
            labelText="Delete Question"
            handleOnPress={handleQuestionDelete}
            style={{
              marginVertical: 10,
              backgroundColor: "red",
            }}
          />
            <FormButton
              labelText="Done & Go Home"
              isPrimary={false}
              handleOnPress={() => {
                // s
                navigation.goBack();
              }}
              
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };
  
  export default EditQuestion;
  
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
  const styles = StyleSheet.create({
    buttonAudio: {
      padding:20,
      alignItems:'center'
    }, edit_audio: {
      fontSize: 15,
      fontStyle: "italic",
      color: "#215A88",
      marginLeft: 120,
    },
  })
  export const SIZES = {
    base: 10,
  };
  