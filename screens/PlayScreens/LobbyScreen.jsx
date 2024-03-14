import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import GameCard from "../../components/GameCard";

export default function LobbyScreen({ route }) {
  const [data, setData] = useState([]);
  const { user, id } = route.params;
  const token = user.accessToken;
  const createGame = async () => {
    try {
      const response = await fetch(
        "https://malamute-enabled-yak.ngrok-free.app/game",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.ok) {
        const updatedResponse = await fetch(
          "https://malamute-enabled-yak.ngrok-free.app/game",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const content = await updatedResponse.json();
        setData(
          content.games.filter(
            (game) => game.player1Id === null || game.player2Id === null ||
            game.player1Id === id ||
            game.player2Id === id )
        );
      } else {
        console.error("Failed to create game");
      }
    } catch (error) {
      console.error("Error creating game: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://malamute-enabled-yak.ngrok-free.app/game",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const content = await response.json();
      setData(
        content.games.filter(
          (game) => game.player1Id === null || game.player2Id === null ||
          game.player1Id === id ||
          game.player2Id === id )
      );
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <GameCard game={item} id={id} token={token} />
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity onPress={createGame} style={styles.createGameButton}>
        <Text style={styles.createGameButtonText}>Or create your game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  createGameButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  createGameButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
