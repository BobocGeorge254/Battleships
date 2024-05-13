import React, { useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import LoadingScreen from '../UtilityScreens/LoadingScreen';
import GameService from '../../services/game.service';
import GameCard from '../../components/GameCard';
import globalStyles from '../../styles';
import { useSelector } from 'react-redux';

const AvailableGames = () => {
  const [data, setData] = useState(null)
  const user = useSelector(state => state.userReducer.user);

  useEffect(() => {
    GameService.getNewGames().then((data) => {
      setData(data.filter(x => x.player1Id != user.id))
    })
  }, [])

  return (
    <View style={globalStyles.screen}>
      <TouchableOpacity activeOpacity={0.7} onPress={handleCreateGame} style={[globalStyles.primaryButton, {marginBottom: 10}]} >
        <Text>Create Game</Text>
      </TouchableOpacity>
      {!data ? <LoadingScreen/> :
        <FlatList 
          data={data}
          renderItem={({item}) => <GameCard game={item}/>}
          keyExtractor={item => item.id}
        />
      }
    </View>
  );

  function handleCreateGame() {
    GameService.createGame().then(status => {
      console.log(status);
    })
  }
}

export default AvailableGames;