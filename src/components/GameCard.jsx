import { useEffect, useState } from "react";
import { Card } from "react-native-elements";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import GameService from "../services/game.service";
import globalStyles from "../styles";

const GameCard = ({ game, userData }) => {
  const navigation = useNavigation();
  const [isPlayer, setIsPlayer] = useState(false);

  useEffect(() => {
    setIsPlayer(game.player1Id == userData.user.id || game.player2Id == userData.user.id)
  })
  return (
    <Card>
      <View style={styles.label}>
        <Text style={styles.text}>Game {game.id}</Text>
      </View>
      
      <View style={[styles.label, {backgroundColor: '#fceded'}]}>
        <Text style={styles.text}>Opponent {game.player1Id != userData.user.id ? game.player1Id : game.player2Id}</Text>
      </View>

      <View style={[styles.label, {backgroundColor: '#b2f7ba'}]}>
        <Text style={styles.text}>Status {game.status}</Text>
      </View>
      

      <TouchableOpacity style={globalStyles.primaryButton} onPress={handleButton}>
        <Text>{isPlayer ? 'Play' : 'Join'}</Text>
      </TouchableOpacity>
    </Card>
  );

  function handleButton() {
    if (!isPlayer)
      return handleJoinGame();
    
    if (game.status == "MAP_CONFIG")
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