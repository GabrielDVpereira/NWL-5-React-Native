import React from "react";
import { StatusBar } from "react-native";

import AppLaoding from "expo-app-loading";
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";
import { Routes } from "./src/routes";
import { PlantContextProvider } from "./src/context/plantsContext";

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
      <PlantContextProvider>
        <Routes />
      </PlantContextProvider>
    </>
  );
}
