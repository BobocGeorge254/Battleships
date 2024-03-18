import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import RegisterScreen from "./src/screens/AuthentificationScreens/RegisterScreen";
import LoginScreen from "./src/screens/AuthentificationScreens/LoginScreen";
import HomeStack from "./src/navigation/HomeStack";

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Auth />
    </NavigationContainer>
  );
}
