import { useContext } from "react";
import { DeviceContext } from "../context/deviceContext";

export function useDevice() {
  return useContext(DeviceContext);
}
