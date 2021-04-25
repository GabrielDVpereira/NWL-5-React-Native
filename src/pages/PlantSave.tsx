import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";

import { SvgFromUri } from "react-native-svg";
import waterDrop from "../assets/waterdrop.png";
import { Button } from "../components/Button";
import colors from "../styles/colors";
import { useRoute } from "@react-navigation/core";
import { getBottomSpace } from "react-native-iphone-x-helper";
import fonts from "../styles/fonts";
import { Plant } from "../context/plantsContext";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { isBefore, format } from "date-fns";
import { savePlantStorage } from "../libs/storage";

interface Params {
  plant: Plant;
}

export function PlantSave() {
  const route = useRoute();

  const { plant } = route.params as Params;
  const [dateSelected, setDateSelected] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios");

  const selectNewDate = (event: Event, dateTime: Date | undefined) => {
    if (Platform.OS === "android") {
      setShowDatePicker((oldState) => !oldState);
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setDateSelected(new Date());
      return Alert.alert("Escolha uma hora no futuro! ⌚");
    }

    if (dateTime) {
      setDateSelected(dateTime);
    }
  };

  const openDateTimeForAndroid = () => {
    setShowDatePicker((oldState) => !oldState);
  };

  const savePlant = async () => {
    try {
      await savePlantStorage({
        ...plant,
        dateTimeNotification: dateSelected,
      });
    } catch {
      Alert.alert("Não foi possível salvar. 😭");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri uri={plant.photo} height={150} width={150} />
        <Text style={styles.plantName}>{plant.name}</Text>
        <Text style={styles.plantAbout}>{plant.about}</Text>
      </View>

      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image source={waterDrop} style={styles.tipImage} />

          <Text style={styles.tipText}>{plant.water_tips}</Text>
        </View>

        <Text style={styles.alertLabel}>
          Escolha o melhor horário para ser lembrado:
        </Text>

        {showDatePicker && (
          <DateTimePicker
            value={dateSelected}
            mode="time"
            display="spinner"
            onChange={selectNewDate}
          />
        )}

        {Platform.OS === "android" && (
          <TouchableOpacity
            style={styles.dataTimerButton}
            onPress={openDateTimeForAndroid}
          >
            <Text style={styles.dataTimerPickerText}>{`Mudar ${format(
              dateSelected,
              "HH:mm"
            )}`}</Text>
          </TouchableOpacity>
        )}

        <Button title="Cadastrar planta" onPress={savePlant} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.shape,
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.shape,
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },
  plantAbout: {
    textAlign: "center",
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10,
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },
  tipContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: "relative",
    bottom: 60,
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: "justify",
    lineHeight: 25,
  },
  alertLabel: {
    textAlign: "center",
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5,
  },
  dataTimerButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 40,
  },
  dataTimerPickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
  },
});
