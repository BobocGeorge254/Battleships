import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/PlayScreens/HomeScreen";
import { useRoute } from "@react-navigation/native";
import LobbyScreen from "../screens/PlayScreens/LobbyScreen";
import ConfigureScreen from "../screens/PlayScreens/ConfigureScreen";

const Stack = createStackNavigator();

export default function HomeStack() {
  const route = useRoute();
  const { user } = route.params;
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ user: user }}
      />
      <Stack.Screen
        name="Lobby"
        component={LobbyScreen}
        initialParams={{ user: user }}
      />
      <Stack.Screen
        name="Configure"
        component={ConfigureScreen}
        initialParams={{ user: user }}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
