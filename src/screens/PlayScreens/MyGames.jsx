import React, { useEffect, useState } from 'react'
import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import GameService from '../../services/game.service';
import LoadingScreen from '../UtilityScreens/LoadingScreen';
import GameCard from '../../components/GameCard';
import globalStyles from '../../styles';
import UserService from '../../services/user.service';

const MyGames = () => {
  const navigation = useNavigation()
  const [gamesData, setGamesData] = useState(null)
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    UserService.me().then((data) =>{
      setUserData(data)
      GameService.getMyGames(data).then(setGamesData)
    })

    const unsubscribe = navigation.addListener('focus', () => {
      setGamesData(null)
      UserService.me().then((data) =>{
        setUserData(data)
        GameService.getMyGames(data).then(setGamesData)
      })
    });

    return unsubscribe;
  }, [navigation])

  return (
    <View style={globalStyles.screen}>
      {!gamesData || !userData ? <LoadingScreen/> :
        <FlatList 
          data={gamesData}
          renderItem={({item}) => <GameCard game={item} userData={userData}/>}
          keyExtractor={(item) => item.id}
        />
      }
    </View>
  );
}

export default MyGames;