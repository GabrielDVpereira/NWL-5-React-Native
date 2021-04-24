import React, { useEffect, useState } from "react";

import { View, SafeAreaView, StyleSheet, Text, FlatList } from "react-native";
import { Header } from "../components/Header";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { EnviromentButton } from "../components/EnviromentButton";
import { api } from "../services/api";
import { AxiosResponse } from "axios";
import { PlantCardPrimary } from "../components/PlantCardPrimary";

interface PlantEnviroment {
  key: string;
  title: string;
}

interface Plant {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  };
}
export function PlantSelect() {
  const [enviroments, setEnviroments] = useState<PlantEnviroment[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [enviromentSelected, setEnviromentSelected] = useState("all");
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);

  useEffect(() => {
    if (!enviroments.length) {
      api
        .get("/plants_environments?_sort=title&_order=asc")
        .then(({ data }) => {
          setEnviroments([{ key: "all", title: "Todos" }, ...data]);
        });
    }
  }, []);

  useEffect(() => {
    if (!plants.length) {
      api.get("/plants?_sort=name&_order=asc").then(({ data }) => {
        setPlants(data);
        setFilteredPlants(data);
      });
    }
  }, []);

  useEffect(() => {
    if (enviromentSelected == "all") {
      return setFilteredPlants(plants);
    }
    const filtered = plants.filter((plant) =>
      plant.environments.includes(enviromentSelected)
    );
    setFilteredPlants(filtered);
  }, [enviromentSelected]);

  const handleEnviromentSelected = (enviroment: PlantEnviroment) => {
    setEnviromentSelected(enviroment.key);
  };

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
            <EnviromentButton
              title={item.title}
              onPress={() => handleEnviromentSelected(item)}
              active={item.key === enviromentSelected}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(key) => String(key.name)}
          renderItem={({ item, index }) => (
            <PlantCardPrimary data={{ name: item.name, photo: item.photo }} />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
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
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
});
