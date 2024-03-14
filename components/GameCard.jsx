import { Card } from "react-native-elements";
import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function GameCard({ game, id, token }) {
  const navigation = useNavigation();
  const handleJoin = async () => {
    const response = await fetch(
      `https://malamute-enabled-yak.ngrok-free.app/game/join/${game.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const content = await response.json();
    const opponentId = game.player1Id === id ? game.player2Id : game.player1Id;
    navigation.navigate("Configure", { playerId: id, opponentId: opponentId });
    console.log(content);
  };
  return (
    <Card style={styles.card}>
      <Text>{game.player1Id ? game.player1Id : "null"}</Text>
      <Text>{game.player2Id ? game.player2Id : "null"}</Text>
      <Text>{game.playerToMoveId}</Text>
        <View style={styles.buttonContainer}>
            <Button
            title="Join"
            buttonStyle={styles.joinButton}
            onPress={handleJoin}
            />
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
