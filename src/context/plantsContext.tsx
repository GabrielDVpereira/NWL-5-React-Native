import React, { createContext, ReactNode, useState, useEffect } from "react";
import { api } from "../services/api";

interface Props {
  children: ReactNode;
}

export interface PlantEnviroment {
  key: string;
  title: string;
}

export interface Plant {
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

interface plantContextData {
  enviroments: PlantEnviroment[];
  plants: Plant[];
  loadPageInformation: () => Promise<void>;
  changeEnviromentSelected: (enviroment: string) => void;
  loadMorePlants: () => Promise<void>;
  enviromentSelected: string;
  isLoadingPage: boolean;
  isLoadingMorePlants: boolean;
  hasSateCache: boolean;
}

export const PlantContext = createContext({} as plantContextData);

export function PlantContextProvider({ children }: Props) {
  const [enviroments, setEnviroments] = useState<PlantEnviroment[]>([]);
  const [enviromentSelected, setEnviromentSelected] = useState("all");
  const [plants, setPlants] = useState<Plant[]>([]);
  const [plantsByEnviroment, setPlantsByEnviroment] = useState<Plant[]>([]);
  const [isLoadingPage, setLoadingPage] = useState<boolean>(false);
  const [hasSateCache, setHasStateCache] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<number>(1);
  const [isPlantLimit, setIsPlantLimit] = useState<boolean>(false);
  const [isLoadingMorePlants, setLoadingMorePlants] = useState<boolean>(false);

  useEffect(() => {
    selectPlantsByEnviroment();
  }, [enviromentSelected, plants]);

  async function loadPageInformation() {
    try {
      setLoadingPage(true);
      await Promise.all([loadEnviroments(), loadPlants()]);
      setHasStateCache(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingPage(false);
    }
  }

  async function loadEnviroments() {
    const response = await api.get(
      "/plants_environments?_sort=title&_order=asc"
    );
    setEnviroments([{ key: "all", title: "Todos" }, ...response.data]);
  }

  async function loadPlants() {
    const response = await api.get(
      `/plants?_page=${nextPage}&_limit=8&_sort=name&_order=asc`
    );
    if (!response.data.length) {
      return setIsPlantLimit(true);
    }
    setPlants([...plants, ...response.data]);
    setNextPage((oldState) => oldState + 1);
  }

  async function loadMorePlants() {
    if (isPlantLimit) return;

    setLoadingMorePlants(true);
    await loadPlants();
    setLoadingMorePlants(false);
  }

  function changeEnviromentSelected(newEnviroment: string) {
    setEnviromentSelected(newEnviroment);
  }

  function selectPlantsByEnviroment() {
    if (enviromentSelected === "all") {
      return;
    }
    const newPlants = plants.filter((plant) =>
      plant.environments.includes(enviromentSelected)
    );
    setPlantsByEnviroment(newPlants);
  }

  function retrievePlants(): Plant[] {
    const isEnviromentSelected = enviromentSelected !== "all";
    if (isEnviromentSelected) {
      return plantsByEnviroment;
    }
    return plants;
  }

  return (
    <PlantContext.Provider
      value={{
        plants: retrievePlants(),
        enviroments: enviroments,
        isLoadingPage,
        changeEnviromentSelected,
        loadPageInformation,
        enviromentSelected,
        hasSateCache,
        loadMorePlants,
        isLoadingMorePlants,
      }}
    >
      {children}
    </PlantContext.Provider>
  );
}
