import React, { useEffect, useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableOpacity,
    ScrollView,
    Touchable,
    SafeAreaView,
    StatusBar,
    FlatList,
    RefreshControl,
   } from "react-native";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");
import { Dimensions } from "react-native";

function AboutFlatList  ({ navigation,route,language }) {

  
  console.log(language)

  const dimensions = Dimensions.get("window");
  const imageHeight = Math.round((dimensions.width * 1) / 1);
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
      .collection("About")
      .orderBy("title","asc")
      .get()
      .then((snapshot) => {
        // console.log(snapshot, "-=-=-=-=-=-=-=-=");
        let postsAll = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setDatalist(postsAll);
        setRefreshing(false);
      });
  };

 

  
  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <View style={styles.container}>
        <Text style={styles.textKagan}>
          {" "} 
          {item.title}
        </Text>
        {/*<Image
          style={{ width: imageWidth, height: imageWidth }}
          source={{ uri: item.image }}
        />*/}
       <Image
          style={{ width: imageWidth, height: imageWidth }}
          source={{ uri: item.image }}/>
        <View style={{ padding: 25 }}>
          <Text style={styles.textVocab}> {item.desc}</Text>
        </View>
        
      </View>
    );
  };
  const onRefresh = () => {
    //Clear old data of the list
    setDatalist([]);
    //Call the Service to get the latest data
    getData();
  };

  return (
    <FlatList
      nestedScrollEnabled
      numColumns={1}
      horizontal={false}
      data={datalist}
      style={{ flex: 1 }}
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

export default AboutFlatList;

const styles = StyleSheet.create({
    container: {
        alignItems: "flex-start",
        marginTop: 20,
        marginBottom:20,
        flex: 1,
      },
      textKagan: {
        flexDirection: "row",
        fontSize: 25,
        fontWeight: "bold",
        paddingVertical:5,
        letterSpacing: 0.25,
        color: "#215a88",
        alignSelf: "center",
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
