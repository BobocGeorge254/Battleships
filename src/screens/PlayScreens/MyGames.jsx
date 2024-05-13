import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { View, FlatList } from 'react-native';

import GameService from '../../services/game.service';
import LoadingScreen from '../UtilityScreens/LoadingScreen';
import GameCard from '../../components/GameCard';
import globalStyles from '../../styles';

const MyGames = () => {
  const [data, setData] = useState(null)
  const user = useSelector(state => state.userReducer.user);

  useEffect(() => {
    GameService.getMyGames().then(setData)
  }, [])

  return (
    <View style={globalStyles.screen}>
      {!data ? <LoadingScreen/> :
        <FlatList 
          data={data}
          renderItem={({item}) => <GameCard game={item}/>}
          keyExtractor={(item, idx) => idx}
        />
      }
    </View>
  );
}

export default MyGames;