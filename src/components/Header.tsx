import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, Image } from "react-native";
import colors from "../styles/colors";
import AvatarImg from "../assets/gabriel.jpeg";
import fonts from "../styles/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Header() {
  const [userName, setUserName] = useState<string>();

  /**TODO - Create a usePersisentState hook and context  to save user info and get in the app */

  useEffect(() => {
    async function getUserFromStorage() {
      const user = await AsyncStorage.getItem("@plantmanager:user");
      if (user) {
        setUserName(user);
      }
    }
    getUserFromStorage();
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greetings}>Olá,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <Image source={AvatarImg} width={200} height={200} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  greetings: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40,
  },
});
