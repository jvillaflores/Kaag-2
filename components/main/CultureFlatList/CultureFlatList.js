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
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AddButton from "../AddButton";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");
// import SeeMore from "react-native-see-more-inline";

import { Dimensions } from "react-native";
import { Directions } from "react-native-gesture-handler";

function CultureFlatList({ navigation, route, language }) {
  const dimensions = Dimensions.get("window");
  //const imageHeight = Math.round(dimensions.width * 1 / 1);
  const imageWidth = dimensions.width;
  const [datalist, setDatalist] = useState("");
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    //Service to get the data from the server to render
    // Fetch the data that are posted by all of the users.
    firebase
    .firestore()
      .collection("languages")
      .doc(language)
      .collection("Culture")
      .get()
      .then((snapshot) => {
        console.log(snapshot, "-=-=-=-=-=-=-=-=");
        let postsAll = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setDatalist(postsAll);
        setRefreshing(false); console.log(postsAll)
      });
  };

  // const ItemView = ({ item }) => {
    return (
      // Flat List Item
      // <TouchableOpacity style={styles.container}>
      //   <Text style={styles.textKagan}>
      //     {" "} 
      //     {item.title}
      //   </Text>
        
      //  <Image
      //     style={{ width: imageWidth, height: imageWidth }}
      //     source={{ uri: item.image }}/>
      //   <View style={{ padding: 30 }}>
      //     <Text style={styles.textVocab}> {item.desc}</Text>
      //   </View>
      // </TouchableOpacity>
      <NavigationContainer independent={true}>
        <FlatList
      nestedScrollEnabled
      keyExtractor={(item, index) => index.toString()}
      numColumns={1}
      horizontal={false}
      data={datalist}
      style={{ flex: 1 }}
      renderItem={({item}) => {
      return(
      <TouchableOpacity 
        style={styles.container}
        onPress={() => navigation.navigate("Word", { data: item })}>
            <View >  
              <Image
              style={{ width: 80, height: 80 }}
              source={{ uri: item.image }}/>
  
            </View>
            <View style={{width:"65%",  paddingHorizontal:10}}>
              <Text style={styles.textKagan}>
                {item.title}
              </Text>
              <View>
                <Text numberOfLines={3} style={styles.textVocab}>{item.desc}</Text>
              </View> 
            </View>
            <View style={{justifyContent:'center'}}>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={20}
                color="#215a88"
              />
            </View>
  
       </TouchableOpacity>
       )
       }}
    
     
    />
      
     </NavigationContainer>
    );
  };
  const onRefresh = () => {
    //Clear old data of the list
    setDatalist([]);
    //Call the Service to get the latest data
    getData();
  };


    
  


export default CultureFlatList;

const styles = StyleSheet.create({
  title: {
    top: 20,
    left: 10,
  },
  container: {
    
    flexDirection:"row",
    flex: 1,
    paddingHorizontal:5,
    paddingVertical: 5,
    justifyContent:"center"
  },
  button: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 10,
    shadowColor: "#F02A4B",
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 },
    backgroundColor: "#8E2835",
  },
  imageprofile: {
    height: 45,
    width: 45,
    borderRadius: 100,
    margin: 10,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilename: {
    fontWeight: "bold",
    paddingLeft: 10,
    paddingBottom: 20,
    paddingTop: 10,
  },

  textHead: {
    flexDirection: "row",
    fontSize: 21,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
  },
  textSubHead: {
    flexDirection: "row",
    fontSize: 15,
    // fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
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
  Abutton: {
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    width: 150,
    top: -120,
    backgroundColor: "#8E2835",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
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
    fontSize: 13,
    fontStyle: "italic",
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
});
