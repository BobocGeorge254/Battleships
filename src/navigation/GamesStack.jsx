import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import MyGames from "../screens/PlayScreens/MyGames";

const Stack = createStackNavigator();

const GamesStack = () => {
  return (
    <Stack.Navigator initialRouteName="MyGames" screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="MyGames"
        component={MyGames}
        options={{headerLeft: null, title: "My games"}}
      />
    </Stack.Navigator>
  );
}

export default GamesStack;
