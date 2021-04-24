import { useContext } from "react";
import { PlantContext } from "../context/plantsContext";

export function usePlants() {
  return useContext(PlantContext);
}
