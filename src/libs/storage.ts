import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import { Plant } from "../context/plantsContext";

interface StoragePlatProps {
  [id: string]: {
    data: Plant;
  };
}

export async function savePlantStorage(plant: Plant): Promise<void> {
  try {
    const data = await AsyncStorage.getItem("@plantmanager:plants");
    const oldPlants = data ? (JSON.parse(data) as StoragePlatProps) : {};

    const newPlant = {
      [plant.id]: {
        data: plant,
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
