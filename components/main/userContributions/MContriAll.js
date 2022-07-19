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
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Dimensions } from "react-native";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");
import { TouchableOpacity } from "react-native-gesture-handler";

function MContriAll({ navigation, language }) {
  const [status, setStatus] = useState("All");
  const [datalist, setDatalist] = useState("");
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    //Service to get the data from the server to render
    firebase
      .firestore()
      .collection("languages")
      .doc(language)
      .collection("dictionary")
      .where("uid", "==", firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        console.log(snapshot, "-=-=-=-=-=-=-=-=");
        let dictionaryAll = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setDatalist(dictionaryAll);
        setRefreshing(false);
      });
  };

  const onRefresh = () => {
    //Clear old data of the list
    setDatalist([]);
    //Call the Service to get the latest data
    getData();
  };

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     firebase
  //       .firestore()
  //       .collection("languages")
  //       .doc(language)
  //       .collection("dictionary")
  //       .where("uid", "==", firebase.auth().currentUser.uid)
  //       .get()
  //       .then((snapshot) => {
  //         let dictionaryAll = snapshot.docs.map((doc) => {
  //           const data = doc.data();
  //           const id = doc.id;
  //           return { id, ...data };
  //         });
  //         setDatalist(dictionaryAll);
  //       });
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.itemContainer}
        onPress={() => navigation.navigate("UserContribution", { data: item })}
      >
        <View style={{ flexDirection: "column", flex: 1 }}>
          <View style={styles.itemBody}>
            <Text style={styles.itemsName}> {item?.word}</Text>
          </View>
          <View style={styles.itemBody}>
            <Text> {item?.meaning}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <View
            style={[
              styles.itemStatus,
              {
                backgroundColor:
                  item.status == "0"
                    ? "#FFEFC5"
                    : "#B5F5D1" && item.status == "2"
                    ? "#FFEFEE"
                    : "#B5F5D1",
              },
            ]}
          >
            <Text
              style={[
                styles.statusFont,
                {
                  color:
                    item.status == "0"
                      ? "#CEA032"
                      : "#63C579" && item.status == "2"
                      ? "#FF9797"
                      : "#63C579",
                },
              ]}
            >
              {" "}
              {item.status == "0"
                ? "Pending"
                : item.status === "1"
                ? "Confirmed"
                : "Declined"}
            </Text>
          </View>
          <View style={[styles.arrowRight]}>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="#8E2835"
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
    <SafeAreaView style={styles.container}>
      <FlatList
        data={datalist}
        keyExtractor={(e, i) => i.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={separator}
        refreshControl={
          <RefreshControl
            //refresh control used for the Pull to Refresh
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </SafeAreaView>
  );
}

export default MContriAll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingHorizontal:10,
    justifyContent: "center",
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
    paddingHorizontal: 20,
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
    position: "relative",
    alignSelf: "center",
    color: "white",
  },
  textSubHead: {
    flexDirection: "row",
    fontSize: 13,
    letterSpacing: 0.25,
    color: "white",
  },
  title: {
    top: 40,
    //left: 110,
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
});
