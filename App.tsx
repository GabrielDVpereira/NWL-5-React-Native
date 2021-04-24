import React from "react";
import { Text, View, StatusBar } from "react-native";
import { Welcome } from "./src/pages/Welcome";
import { UserIdentification } from "./src/pages/UserIdentification";
import AppLaoding from "expo-app-loading";
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLaoding />; // keep our splash page while fonts not loaded
  }
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <UserIdentification />
    </>
  );
}
