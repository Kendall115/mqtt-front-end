import { useEffect, useState } from "react";
import { socket } from "../../socket";
import { useSensorContext } from "../../contexts/SensorContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import "./SensorList.css";

function SensorList() {
  const {
    currentSensorType,
    setCurrentSensorId,
    currentSensorId,
    connectedSensors,
  } = useSensorContext();

  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    socket.emit("get sensors", currentSensorType, (data) => {
      if (data.length > 0) setCurrentSensorId(data[0].sensor_id);
      setSensors(data);
    });
  }, [currentSensorType]);

  useEffect(() => {
    const handleNewSensor = (newSensor) => {
      if (sensors.length === 0) setCurrentSensorId(newSensor.sensor_id);
      setSensors((prevSensor) => [...prevSensor, newSensor]);
    };

    socket.on(`new sensor ${currentSensorType}`, handleNewSensor);
    return () => {
      socket.off(`new sensor ${currentSensorType}`, handleNewSensor);
    };
  }, [sensors]);

  return (
    <List sx={{ padding: 0, overflowY: "auto", gridRow: "2 / -1" }}>
      {sensors.map((sensor) => (
        <ListItem sx={{ paddingLeft: 0 }} key={sensor.sensor_id}>
          <ListItemButton
            onClick={() => setCurrentSensorId(sensor.sensor_id)}
            sx={{
              bgcolor:
                currentSensorId === sensor.sensor_id
                  ? "#1976d2"
                  : "transparent",
              "&:hover": {
                bgcolor: "#64b5f6",
                color: "white",
              },
              color: currentSensorId === sensor.sensor_id ? "white" : "black",
            }}
          >
            <span
              className={`sensor-dot ${
                connectedSensors.includes(sensor.sensor_id)
                  ? "connected"
                  : "disconnected"
              }`}
            ></span>
            <ListItemText primary={sensor.sensor_id} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default SensorList;
