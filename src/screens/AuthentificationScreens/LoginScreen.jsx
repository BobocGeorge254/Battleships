import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

import HomeStack from "../../navigation/HomeStack";
import UserService from "../../services/user.service";
import { setUser } from "../../redux/userSlice";
import globalStyles from "../../styles";
import LoadingScreen from "../UtilityScreens/LoadingScreen";

export default function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    UserService.recoverSession().then((data) => {
      if (!data || data.code == 403) {
        setLoading(false);
        return
      };

      dispatch(setUser(data));
      navigation.navigate("Tabs")
    }).catch(() => {
      setLoading(false);
    })
  })

  const handleLogin = async () => {
    const data = await UserService.login(email, password);
    if (!data || data.code == 403) return;

    dispatch(setUser(data));
    navigation.navigate("Tabs")
  };

  if (loading) return <LoadingScreen />

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="EMAIL"
          value={email}
          onChangeText={setEmail}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="PASSWORD"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity onPress={handleLogin} style={[globalStyles.primaryButton, globalStyles.fullWidth]}>
        <Text>Log in</Text>
      </TouchableOpacity>
      <Text onPress={() => navigation.navigate("Register")}>
        New Here ? Register
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40
  },
  inputView: {
    gap: 15,
    width: "100%",
    marginBottom: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    paddingVertical: 40,
    color: "black",
  },
});
