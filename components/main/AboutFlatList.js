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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


function AboutFlatList  ({ navigation,route,language }) {

  
 

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
  const onRefresh = () => {
    //Clear old data of the list
    setDatalist([]);
    //Call the Service to get the latest data
    getData();
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

export default AboutFlatList;

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
