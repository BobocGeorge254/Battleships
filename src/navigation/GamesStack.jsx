import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import MyGamesScreen from "../screens/PlayScreens/MyGamesScreen";
import ConfigureScreen from "../screens/PlayScreens/ConfigureScreen";
import GameActionScreen from "../screens/PlayScreens/GameActionScreen";

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
      <Stack.Screen 
        name="GameAction"
        children={({route, navigation}) => <GameActionScreen route={route} navigation={navigation}/>}
        options={({route}) => ({title: route.params.game.id})}
      />
    </Stack.Navigator>
  );
}

export default GamesStack;
