import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import UserService from "../../services/user.service";
import LoadingScreen from "../UtilityScreens/LoadingScreen";

export default function HomeScreen() {
  const [data, setData] = useState(null);
  const user = useSelector(state => state.userReducer.user);
  const navigation = useNavigation();

  const handleLogout = () => {
    user.accessToken = null;
    navigation.navigate("Login");
  };

  useEffect(() => {
    UserService.me().then(setData)
  }, []);

  if (!data)
    return <LoadingScreen/>

  return (
    <View style={styles.container}>
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
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
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
