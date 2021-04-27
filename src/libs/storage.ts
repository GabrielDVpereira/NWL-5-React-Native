import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import { Plant } from "../context/plantsContext";
import * as Notifications from "expo-notifications";

export interface StoragePlatProps {
  [id: string]: {
    data: Plant;
    notifiationId: string;
  };
}

export async function savePlantStorage(plant: Plant): Promise<void> {
  const nextTime = new Date(plant.dateTimeNotification);
  const now = new Date();

  const { times, repeat_every } = plant.frequency;

  if (repeat_every === "week") {
    const interval = Math.trunc(7 / times);
    nextTime.setDate(now.getDate() * interval);
  } else {
    nextTime.setDate(nextTime.getDate() + 1);
  }

  const seconds = Math.abs(
    Math.ceil(now.getTime() - nextTime.getTime()) / 1000
  );

  try {
    const notifiationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Heeyy,🌱",
        body: `Está na hora de cuidar da sua ${plant.name}`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: {
          plant,
        },
      },
      trigger: {
        seconds: 60,
        repeats: true,
      },
    });

    const data = await AsyncStorage.getItem("@plantmanager:plants");
    const oldPlants = data ? (JSON.parse(data) as StoragePlatProps) : {};

    const newPlant = {
      [plant.id]: {
        data: plant,
        notifiationId,
      },
    };

    await AsyncStorage.setItem(
      "@plantmanager:plants",
      JSON.stringify({
        ...newPlant,
        ...oldPlants,
      })
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function loadPlantsFromStorage(): Promise<Plant[]> {
  try {
    const data = await AsyncStorage.getItem("@plantmanager:plants");
    const plants = data ? (JSON.parse(data) as StoragePlatProps) : {};

    const plantsFormated = Object.keys(plants)
      .map((plant) => ({
        ...plants[plant].data,
        hour: format(
          new Date(plants[plant].data.dateTimeNotification),
          "HH:mm"
        ),
      }))
      .sort((plant1, plant2) => {
        return Math.floor(
          new Date(plant1.dateTimeNotification).getTime() / 1000 -
            Math.floor(new Date(plant2.dateTimeNotification).getTime() / 1000)
        );
      });
    return plantsFormated;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deletePlantFromStorage(plant: Plant): Promise<void> {
  try {
    const data = await AsyncStorage.getItem("@plantmanager:plants");
    const plants = data ? (JSON.parse(data) as StoragePlatProps) : {};

    await Notifications.cancelScheduledNotificationAsync(
      plants[plant.id].notifiationId
    );

    delete plants[plant.id];

    await AsyncStorage.setItem("@plantmanager:plants", JSON.stringify(plants));
  } catch (error) {
    throw new Error(error);
  }
}

export async function saveUsernameStorage(name: string): Promise<void> {
  try {
    await AsyncStorage.setItem("@plantmanager:user", name);
  } catch {
    throw new Error("Não foi possível salvar o seu nome");
  }
}

export async function getUsernameFromStorage(): Promise<string | null> {
  try {
    const name = AsyncStorage.getItem("@plantmanager:user");
    return name;
  } catch {
    throw new Error("Não foi possível recuperar nome do usuário");
  }
}
