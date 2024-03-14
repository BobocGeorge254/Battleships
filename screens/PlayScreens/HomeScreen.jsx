import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen({ route }) {
  const [data, setData] = useState(null);
  const { user } = route.params;
  const token = user.accessToken;
  const navigation = useNavigation();

  const handleLogout = () => {
    user.accessToken = null ;
    navigation.navigate("Login");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://malamute-enabled-yak.ngrok-free.app/user/details/me",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const content = await response.json();
        setData(content);
      } catch (error) {
        console.error("Error fetching user details: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {data ? (
        <View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileItem}>
              Games Played: {data.gamesPlayed}
            </Text>
            <Text style={styles.profileItem}>Games Won: {data.gamesWon}</Text>
            <Text style={styles.profileItem}>Games Lost: {data.gamesLost}</Text>
            <Text style={styles.profileItem}>
              Currently Playing: {data.currentlyGamesPlaying}
            </Text>
            <Text style={styles.profileItem}>User ID: {data.user.id}</Text>
            <Text style={styles.profileItem}>Email: {user.email}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Lobby")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Go to Lobby</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
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
  profileInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileItem: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  logoutButton: {
    marginTop: 10,
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});
