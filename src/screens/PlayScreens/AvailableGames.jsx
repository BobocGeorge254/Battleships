import React, { useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LoadingScreen from '../UtilityScreens/LoadingScreen';
import GameService from '../../services/game.service';
import GameCard from '../../components/GameCard';
import globalStyles from '../../styles';
import { useSelector } from 'react-redux';
import UserService from '../../services/user.service';

const AvailableGames = () => {
  const navigation = useNavigation()
  const [gamesData, setGamesData] = useState(null)
  const user = useSelector(state => state.userReducer.user);
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    GameService.getNewGames().then((data) => {
      setGamesData(data.filter(x => x.player1Id != user.id))
    })

    UserService.me().then(setUserData);

    const unsubscribe = navigation.addListener('focus', () => {
      setGamesData(null)
      GameService.getNewGames().then((data) => {
        setGamesData(data.filter(x => x.player1Id != user.id))
      })  
    });

    return unsubscribe;
  }, [navigation])

  

  return (
    <View style={globalStyles.screen}>
      <TouchableOpacity activeOpacity={0.7} onPress={handleCreateGame} style={[globalStyles.primaryButton, {marginBottom: 10}]} >
        <Text>Create Game</Text>
      </TouchableOpacity>
      {!gamesData || !userData ? <LoadingScreen/> :
        <FlatList 
          data={gamesData}
          renderItem={({item}) => <GameCard game={item} userData={userData}/>}
          keyExtractor={item => item.id}
        />
      }
    </View>
  );

  function handleCreateGame() {
    GameService.createGame().then(status => {
      if (status == 200)
        navigation.navigate('MyGamesStack')
    })
  }
}

export default AvailableGames;