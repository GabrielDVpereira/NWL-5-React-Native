import React from "react";
import { Text, View, StatusBar } from "react-native";
import { Welcome } from "./src/pages/Welcome";

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Welcome />
    </>
  );
}
