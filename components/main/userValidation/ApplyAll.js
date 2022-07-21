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

function ApplyAll({ navigation }) {
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
      .collection("users")
      .where("applicant", "==", "1")
      .get()
      .then((snapshot) => {
        console.log(snapshot, "-=-=-=-=-=-=-=-=");
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setDatalist(users);
        setRefreshing(false);
      });
  };

  const onRefresh = () => {
    //Clear old data of the list
    setDatalist([]);
    //Call the Service to get the latest data
    getData();
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.itemContainer}
        onPress={() => navigation.navigate("ConfirmScreen", { data: item })}
      >
        <View style={{ flexDirection: "column", flex: 1 }}>
          <View style={styles.itemBody}>
            <Text style={styles.itemsName}> {item?.name}</Text>
          </View>
          <View style={styles.itemBody}>
            <Text> {item?.note}</Text>
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

export default ApplyAll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    paddingVertical: 20,
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
});
