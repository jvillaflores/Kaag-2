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

function ApplyAll({ navigation, language }) {
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

export default ApplyAll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignContent: "center",
    paddingVertical: 5,
    flexDirection:'row'
  },
  listTab: {
    alignSelf: "center",
    marginBottom: 20,
    flexDirection: "row",
    paddingHorizontal: 2,
    backgroundColor: "#ebebeb",
    borderRadius: 10,
  },

  btnTab: {
    width: Dimensions.get("window").width / 4.5,
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "#ebebeb",
    padding: 10,
    justifyContent: "center",
  },
  textTab: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
    //lineHeight: 1,
  },
  brnTabActive: {
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  textTabActive: {
    color: "#8E2835",
    fontWeight: "bold",
    fontSize: 13,
  },
  itemContainer: {
    flexDirection: "row",
    paddingVertical: 15,
  },
  itemLogo: {
    padding: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
  },

  itemBody: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },

  itemsName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemStatus: {
    backgroundColor: "#69C080",
    paddingHorizontal: 17,
    height: 30,
    justifyContent: "center",
    right: 14,
    borderRadius: 5,
  },
  headLine: {
    flexDirection: "column",
    width: "100%",
    padding: 30,
    top: -20,
    height: 150,
    backgroundColor: "#8E2835",
    alignItems: "flex-start",
    justifyContent: "center",
    position: "relative",
  },
  textHead: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#8E2835",
    paddingVertical: 15,
  },

  statusFont: {
    fontWeight: "bold",
  },
  arrowRight: {
    backgroundColor: "#ebebeb",
    paddingHorizontal: 5,
    width: 30,
    height: 30,
    justifyContent: "center",
    right: 2,
    borderRadius: 5,
    margin: 10,
  },
  buttonContainer: {
    alignItems: "flex-end",
    alignSelf: "center",
  },
  textKagan:{
    fontWeight: "bold",
  }
});
