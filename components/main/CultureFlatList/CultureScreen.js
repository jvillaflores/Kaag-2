import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  FlatList,
  RefreshControl,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
require("firebase/firestore");
require("firebase/firebase-storage");
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Language from "../Language";

function CultureScreen({ navigation, language }) {
  const [status, setStatus] = useState("All");
  const [datalist, setDatalist] = useState("");
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    //Service to get the data from the server to render
    //Applicant == 1 , basic user that has applied to be a validator
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
        setRefreshing(false);
      });
  };

  const onRefresh = () => {
    //Clear old data of the list
    setDatalist([]);
    //Call the Service to get the latest data
    getData();
  };

  const ItemView = ({ item }) => {
    return (
      
      <TouchableOpacity 
          onPress={() => navigation.navigate("DeleteAbout", { data: item })}
          style={styles.container}>
          
          <View>  
            <Image
            style={{ width: 80, height: 80 }}
            source={{ uri: item.image }}/>

          </View>
          <View style={{flexDirection:"row",}}>
            <View style={{width:"80%",  paddingHorizontal:10, paddingVertical: 5}}>
              <Text style={styles.textKagan}>
                {item.title}
              </Text>
              <View>
                <Text numberOfLines={3} style={{fontSize:10}}>{item.desc}</Text>
              </View> 
            </View>
            <View style={{justifyContent:'center'}}>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={20}
                color="#215a88"
              />
            </View>
          </View>
          
            
     </TouchableOpacity>
      
    );
  };
  
  const separator = () => {
    return <View style={{ height: 1, backgroundColor: "#E6E5E5" }} />;
  };

  return (
    <FlatList
      nestedScrollEnabled
      numColumns={1}
      horizontal={false}
      data={datalist}
      style={{ flex: 1 }}
      ItemSeparatorComponent={separator}
      renderItem={ItemView}
      refreshControl={
        <RefreshControl
          //refresh control used for the Pull to Refresh
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    />
  );
}

export default CultureScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignContent: "center",
    paddingVertical: 5,
    flexDirection:'row'
  },
  textKagan:{
    fontWeight: "bold",
    
  },
  textVocab: {
    fontSize: 13,
    margin: 0,
    fontStyle: "italic",
    //lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
    textAlign:'justify'
  },
});
