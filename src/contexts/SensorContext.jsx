import { createContext, useContext, useState } from "react";

const SensorContext = createContext();

const SensorProvider = ({ children }) => {
  const [currentSensorType, setCurrentSensorType] = useState("temperature");
  const [currentSensorId, setCurrentSensorId] = useState();
  const [connectedSensors, setConnectedSensors] = useState([]);

  const value = {
    currentSensorType,
    setCurrentSensorType,
    currentSensorId,
    setCurrentSensorId,
    connectedSensors,
    setConnectedSensors,
  };

  return (
    <SensorContext.Provider value={value}>{children}</SensorContext.Provider>
  );
};

export const useSensorContext = () => {
  const context = useContext(SensorContext);
  if (!context) {
    throw new Error("useSensorContext must be used within a SensorProvider");
  }
  return context;
};

export default SensorProvider;
