import React from "react";
import { Provider } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import RegisterScreen from "./src/screens/AuthentificationScreens/RegisterScreen";
import LoginScreen from "./src/screens/AuthentificationScreens/LoginScreen";
import HomeStack from "./src/navigation/HomeStack";
import { store } from "./src/redux/store";
import Tabs from "./src/navigation/Tabs";

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Provider store={store}>
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
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </Provider>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Auth />
    </NavigationContainer>
  );
}
