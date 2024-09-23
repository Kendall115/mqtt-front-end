import { useSensorContext } from "../../contexts/SensorContext";
import { useEffect } from "react";
import { socket } from "../../socket";
import SensorChart from "../sensor-chart/SensorChart";
import SensorList from "../sensor-list/SensorList";
import SensorTypeSelector from "../sensor-type-selector/SensorTypeSelector";

function Dashboard() {
  const { setConnectedSensors } = useSensorContext();

  socket.on("sensors list update", (updatedSensorList) => {
    setConnectedSensors(updatedSensorList);
  });

  useEffect(() => {
    const updateSensorsConnected = (updatedSensorList) => {
      setConnectedSensors(updatedSensorList);
    };
    socket.emit("get sensors connected", updateSensorsConnected);
    return () => {
      socket.off(`get sensors connected`, updateSensorsConnected);
    };
  }, []);

  return (
    <>
      <SensorTypeSelector />
      <SensorList />
      <SensorChart />
    </>
  );
}

export default Dashboard;
