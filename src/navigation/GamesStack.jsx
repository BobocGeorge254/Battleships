import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import MyGamesScreen from "../screens/PlayScreens/MyGamesScreen";
import ConfigureScreen from "../screens/PlayScreens/ConfigureScreen";

const Stack = createStackNavigator();

const GamesStack = () => {
  return (
    <Stack.Navigator initialRouteName="MyGames">
      <Stack.Screen
        name="MyGames"
        component={MyGamesScreen}
        options={{headerLeft: null, title: "My games"}}
      />
      <Stack.Screen 
        name="MapConfig"
        children={({route, navigation}) => <ConfigureScreen route={route} navigation={navigation}/>}
        options={{title: "Map configuration"}}
      />
    </Stack.Navigator>
  );
}

export default GamesStack;
