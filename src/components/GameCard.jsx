import { useEffect, useState } from "react";
import { Card } from "react-native-elements";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import GameService from "../services/game.service";
import globalStyles from "../styles";
import UserService from "../services/user.service";

const GameCard = ({ game, userData }) => {
  const navigation = useNavigation();
  const [isPlayer, setIsPlayer] = useState(false);
  const [opponent, setOpponent] = useState(null)

  useEffect(() => {
    setIsPlayer(game.player1Id == userData.user.id || game.player2Id == userData.user.id)
    const opponentId = game.player1Id != userData.user.id ? game.player1Id : game.player2Id;
    setOpponent(opponentId)
  })

  if (!opponent) 
    return null;

  return (
    <Card>
      <View style={styles.label}>
        <Text style={styles.text}>Game {game.id}</Text>
      </View>
      
      <View style={[styles.label, {backgroundColor: '#fceded'}]}>
        <Text style={styles.text}>Opponent {opponent}</Text>
      </View>

      <View style={[styles.label, {backgroundColor: '#b2f7ba'}]}>
        <Text style={styles.text}>Status {game.status}</Text>
      </View>
      

      <TouchableOpacity style={globalStyles.primaryButton} onPress={handleButton}>
        <Text>{isPlayer ? 'Play' : 'Join'}</Text>
      </TouchableOpacity>
    </Card>
  );

  async function handleButton() {
    if (!isPlayer)
      return handleJoinGame();
    
    const gameDetails = await GameService.getGameDetails(game.id);

    if (gameDetails.shipsCoord && gameDetails.shipsCoord.length > 0)
      navigation.navigate("GameAction", {game, userData})
    else
      navigation.navigate("MapConfig", {game})
  }

  function handleJoinGame() {
    GameService.joinGame(game.id).then(status => {
      if (status == 200) {
        navigation.navigate('MyGamesStack')
      }
    })
  }
}

export default GameCard;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center', 
    fontWeight: 'bold', 
    fontSize: 12
  },

  label: {
    marginBottom: 10, 
    backgroundColor: '#eeedfc', 
    borderRadius: 10, 
    paddingVertical: 5
  }
})