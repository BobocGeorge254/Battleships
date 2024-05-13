import { Card } from "react-native-elements";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GameService from "../services/game.service";
import globalStyles from "../styles";

const GameCard = ({ game }) => {
  const navigation = useNavigation();
  
  return (
    <Card>
      <Text style={globalStyles.label}>Opponent id</Text>
      <Text style={{marginBottom: 10}}>{game.player1Id}</Text>
      <TouchableOpacity style={globalStyles.primaryButton} onPress={handleJoinGame}>
        <Text>Join</Text>
      </TouchableOpacity>
    </Card>
  );

  function handleJoinGame() {
    GameService.joinGame(game.id).then(status => {
      if (status == 200) {
        
      }
    })
  }
}

export default GameCard;

