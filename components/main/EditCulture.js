import React, { useState, useEffect } from "react";
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
<<<<<<< Updated upstream
=======
  NavigationContainer
>>>>>>> Stashed changes
} from "react-native";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const EditCulture = ({ navigation, route }) => {
  const { language } = route?.params ?? {};
  console.log(language);
  const [filteredDataSource, setFilteredDataSource] = useState("");
  const [masterDataSource, setMasterDataSource] = useState("");
  const [datalist, setDatalist] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      firebase
        .firestore()
        .collection("languages")
        .doc(language)
        .collection("Culture")
        .get()
        .then((snapshot) => {
          let masterDataSource = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
<<<<<<< Updated upstream

          setDatalist(masterDataSource);
          setFilteredDataSource(masterDataSource);
          setMasterDataSource(masterDataSource);
          console.log(masterDataSource);
        });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      <FlatList
        nestedScrollEnabled
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
        horizontal={false}
        data={filteredDataSource}
        style={{ flex: 1 }}
        renderItem={({ item }) => {
          return (
            <View>
              <TouchableOpacity
                style={styles.container}
                onPress={() =>
                  navigation.navigate("EditCultures", {
                    data: item,
                    language: language,
                  })
                }
              >
                <View style={styles.contextButton}>
                  <Text style={styles.inKagan}>{item.title} </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <Pressable
        style={styles.buttonss}
        onPress={() =>
          navigation.navigate("AddCulture", { language: language })
=======
      });
  
      return unsubscribe;
    }, [navigation]);
  
  
  
    return (
      <NavigationContainer independent={true}>
      <View style={styles.container}>
        <View style={styles.innercontainer}>
          <Text style={styles.textHead}>Welcome, {datalist.name} </Text>
          <Text style={styles.textSubHead}>Engage in Community</Text>
          <Text style={styles.textreg}>
            Create and share your photos and stories with the community.
          </Text>
        </View>
      </View>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarContentContainerStyle: {
            backgroundColor: "#f2f2f2",
          },
          tabBarActiveTintColor: "#215a88",
          tabBarInactiveTintColor: "#B2B2B2",

          tabBarPressColor: "#215a88",
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: "bold",
          },
        })}
      >
        <Tab.Screen
          name="Feed"
          children={(props) => <SocialScreen language={language} {...props} />}
        />
        <Tab.Screen
          name="Social"
          children={(props) => <FeedScreen language={language} {...props} />}
        />
        
      </Tab.Navigator>

      <Pressable
        style={styles.button}
        onPress={() =>
          navigation.navigate("MainContribution", { language: language })
>>>>>>> Stashed changes
        }
        //onPress={() => navigation.navigate("NewContribution")}
      >
        <MaterialCommunityIcons name="plus" color={"#ffffff"} size={40} />
      </Pressable>
<<<<<<< Updated upstream
    </View>
  );
};

export default EditCulture;
const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    top: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  inKagan: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.3,
  },
  input: {
    letterSpacing: 0.25,
    height: 50,
    width: "95%",
    paddingLeft: 12,
    paddingTop: 1,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#707070",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 0.5,
  },
  bodycontainer: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  addButton: {
    borderColor: "#70707033",
    borderWidth: 1.5,
    marginVertical: 10,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flex: 1,
    borderRadius: 5,
    alignItems: "center",
    paddingVertical: 15,
    marginTop: 10,
  },
  contextButton: {
    //padding: 13,
    flexDirection: "row",
    paddingHorizontal: 35,
    alignItems: "center",
  },
  text_Context: {
    flexDirection: "column",
    marginLeft: 20,
    alignItems: "flex-start",
  },
  buttonVocab: {
    width: "100%",
    //alignSelf: "center",
    //alignItems: "flex-start",
    //marginTop: 10,
    elevation: 0.7,
    //width: 300,
    backgroundColor: "#EBEBEB",
    borderRadius: 10,
    paddingVertical: 15,
    marginVertical: 5,
  },
  buttonss: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 10,
    shadowColor: "#F02A4B",
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 },
    backgroundColor: "#91B2EB",
    top: 100,
    right: 30,
    elevation: 9,
  },
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#03A9F4",
    borderRadius: 30,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 40,
    color: "white",
  },
});
=======
    </NavigationContainer>
      //   <View>
      //   <FlatList
      //      nestedScrollEnabled
      //      keyExtractor={(item, index) => index.toString()}
      //      numColumns={1}
      //      horizontal={false}
      //      data={filteredDataSource}
      //      style={{ flex: 1 }}
      //      renderItem={({ item }) => {
      //        return (
      //        <View>
      //          <TouchableOpacity
      //          style={styles.container}
      //            onPress={() => navigation.navigate("EditCultures", { data: item , language: language})}
      //          >
      //            <View style={styles.contextButton}>
      //              <Text style={styles.inKagan}>{item.title} </Text>
      //            </View>
      //          </TouchableOpacity>
      //          </View>
      //        );
      //      }}
      //    />
      //    <Pressable
      //    style={styles.buttonss}
      //    onPress={() =>
      //      navigation.navigate("AddCulture", { language: language })
      //    }
      //    //onPress={() => navigation.navigate("NewContribution")}
      //  >
      //    <MaterialCommunityIcons name="plus" color={"#ffffff"} size={40} />
         
      //  </Pressable>
      //    </View>
       
      
      
    )
}

export default EditCulture;
const styles = StyleSheet.create({
    container: {
      alignContent: "center",
      top: 1,
      paddingVertical: 15,
      paddingHorizontal: 20,
    },
    inKagan: {
        fontSize: 20,
        fontWeight: "bold",
        letterSpacing: 0.3,
      },
    input: {
      letterSpacing: 0.25,
      height: 50,
      width: "95%",
      paddingLeft: 12,
      paddingTop: 1,
      marginTop: 10,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: "#707070",
    },
    text: {
      fontWeight: "bold",
      fontSize: 20,
      letterSpacing: 0.5,
    },
    bodycontainer: {
      paddingVertical: 5,
      paddingHorizontal: 15,
    },
    addButton: {
      borderColor: "#70707033",
      borderWidth: 1.5,
      marginVertical: 10,
      borderRadius: 7,
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      flex: 1,
      borderRadius: 5,
      alignItems: "center",
      paddingVertical: 15,
      marginTop: 10,
    },
    contextButton: {
        //padding: 13,
        flexDirection: "row",
        paddingHorizontal: 35,
        alignItems: "center",
      },
      text_Context: {
        flexDirection: "column",
        marginLeft: 20,
        alignItems: "flex-start",
      },
      buttonVocab: {
        width: "100%",
        //alignSelf: "center",
        //alignItems: "flex-start",
        //marginTop: 10,
        elevation: 0.7,
        //width: 300,
        backgroundColor: "#EBEBEB",
        borderRadius: 10,
        paddingVertical: 15,
        marginVertical: 5,
      },
      buttonss: {
         position: "absolute",
         width: 70,
         height: 70,
         borderRadius: 70 / 2,
         alignItems: "center",
         justifyContent: "center",
         shadowRadius: 10,
         shadowColor: "#fff",
         shadowOpacity: 0.3,
         shadowOffset: { height: 10 },
        backgroundColor: "#215A88",
         top: 540,
         right: 40,
         elevation: 9,
        
      },
      fab: { 
        position: 'absolute', 
        width: 56, 
        height: 56, 
        alignItems: 'center', 
        justifyContent: 'center', 
        right: 20, 
        bottom: 20, 
        backgroundColor: '#03A9F4', 
        borderRadius: 30, 
        elevation: 8 
        }, 
        fabIcon: { 
          fontSize: 40, 
          color: 'white' 
        }
  });
  
>>>>>>> Stashed changes
