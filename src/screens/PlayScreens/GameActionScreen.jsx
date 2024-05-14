import React, { useEffect, useState } from 'react'
import { View } from 'react-native';

import LoadingScreen from '../UtilityScreens/LoadingScreen';
import GameService from '../../services/game.service';
import ShipsBoard from '../../components/ShipsBoard';
import { ship_colors } from '../../constants';

const GameActionScreen = ({route}) => {
  const {game, userData} = route.params
  const [gameDetails, setGameDetails] = useState(null)

  useEffect(() => {
    GameService.getGameDetails(game.id).then(setGameDetails);
  })

  if (!gameDetails) return <LoadingScreen />

  return (
    <View>
      <ShipsBoard board={getMyBoard(gameDetails.shipsCoord)} cellSize={25} cellColor={(cell) => cell ? ship_colors[cell] : "gray"}/>
    </View>
  );

  function getMyBoard(ships) {
    const board = Array(10).fill(Array(10).fill(null))
    if (!ships) return;

    for (let i = 0; i < ships.length; i++) {

      const currentShip = ships[i]
      console.log(userData.user.id)
      if (currentShip.playerId != userData.user.id)
        continue;

      const colIndex = currentShip.x.charCodeAt(0) - 'A'.charCodeAt(0)
      const rowIndex = currentShip.y - 1

      if (currentShip.direction == "HORIZONTAL" )
        for (let i = colIndex; i < colIndex + currentShip.size; i++)
          board[rowIndex][i] = currentShip.size;
        
      if (currentShip.direction == "VERTICAL" )
        for (let i = rowIndex; i < rowIndex + currentShip.size; i++)
          board[i][colIndex] = currentShip.size;
    }
    
    return board;
  }
}

export default GameActionScreen;