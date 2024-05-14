import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/PlayScreens/HomeScreen';
import AvailableGamesScreen from '../screens/PlayScreens/AvailableGamesScreen';
import GamesStack from './GamesStack';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name="AvailableGames" component={AvailableGamesScreen} options={{title: 'Discover'}}/>
      <Tab.Screen name="Home" component={HomeScreen} options={{title: 'Home'}} />
      <Tab.Screen name="MyGamesStack" component={GamesStack} options={{headerShown: false}}/>
    </Tab.Navigator>
  );
}

export default Tabs;