import { Card } from "react-native-elements";
import { StyleSheet, Text, View, Button } from "react-native";

export default function GameCard({game}) {
    return (
      <Card style={styles.card}>
        <Text>{game.player1Id ? game.player1Id : "null"}</Text>
        <Text>{game.player2Id ? game.player2Id : "null"}</Text>
        <Text>{game.playerToMoveId}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Join" buttonStyle={styles.joinButton} />
        </View>
      </Card>
    );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    margin: 10,
    padding: 0,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  joinButton: {
    backgroundColor: "blue",
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
});