import React, { useEffect, useState } from "react";

import { View, SafeAreaView, StyleSheet, Text, FlatList } from "react-native";
import { Header } from "../components/Header";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { EnviromentButton } from "../components/EnviromentButton";
import { api } from "../services/api";
import { AxiosResponse } from "axios";

interface PlantEnviroment {
  key: string;
  title: string;
}
export function PlantSelect() {
  const [enviroments, setEnviroments] = useState<PlantEnviroment[]>();

  useEffect(() => {
    api.get("/plants_environments").then(({ data }) => {
      setEnviroments(data);
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>Você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList
          data={enviroments}
          keyExtractor={(key) => String(key.title)}
          renderItem={({ item, index }) => (
            <EnviromentButton title={item.title} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },
  header: {
    paddingHorizontal: 30,
  },
  enviromentList: {
    height: 40,
    justifyContent: "center",
    paddingBottom: 5,
    marginVertical: 32,
    paddingHorizontal: 32,
  },
});
