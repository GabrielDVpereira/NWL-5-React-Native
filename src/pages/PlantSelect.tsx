import React, { useEffect } from "react";

import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Header } from "../components/Header";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { EnviromentButton } from "../components/EnviromentButton";
import { PlantCardPrimary } from "../components/PlantCardPrimary";
import { Load } from "../components/Load";
import { usePlants } from "../hooks/usePlants";
import { Plant } from "../context/plantsContext";
import { useNavigation } from "@react-navigation/native";
import { routes } from "../routes/routesName";

export function PlantSelect() {
  const navigation = useNavigation();
  const {
    enviroments,
    isLoadingPage,
    loadPageInformation,
    hasSateCache,
    plants,
    changeEnviromentSelected,
    enviromentSelected,
    loadMorePlants,
    isLoadingMorePlants,
  } = usePlants();

  useEffect(() => {
    if (!hasSateCache) {
      loadPageInformation();
    }
  }, []);

  function selectNewPlant(plant: Plant) {
    navigation.navigate(routes.plantSave, { plant });
  }
  if (isLoadingPage) {
    return <Load />;
  }

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
              onPress={() => changeEnviromentSelected(item.key)}
              active={enviromentSelected === item.key}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={plants}
          keyExtractor={(key) => String(key.name)}
          renderItem={({ item, index }) => (
            <PlantCardPrimary
              data={{ name: item.name, photo: item.photo }}
              onPress={() => selectNewPlant(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => {
            if (distanceFromEnd > 1) loadMorePlants();
          }}
          ListFooterComponent={
            isLoadingMorePlants ? (
              <ActivityIndicator color={colors.green} />
            ) : (
              <></>
            )
          }
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
