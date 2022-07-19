import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import MainContribution1 from "./components/main/Contribution";
import VocabularyScreen from "./components/main/Vocabulary";

const Stack = createStackNavigator();

const FirstScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainContribution"
        component={MainContribution1}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export { FirstScreenNavigator };
