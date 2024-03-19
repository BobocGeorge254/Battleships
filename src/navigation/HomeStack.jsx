import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/PlayScreens/HomeScreen";
import LobbyScreen from "../screens/PlayScreens/LobbyScreen";
import ConfigureScreen from "../screens/PlayScreens/ConfigureScreen";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="Lobby"
        component={LobbyScreen}
      />
      <Stack.Screen
        name="Configure"
        component={ConfigureScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
