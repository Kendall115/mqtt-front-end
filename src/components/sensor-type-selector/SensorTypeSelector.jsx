import { Button, Stack } from "@mui/material";
import { useSensorContext } from "../../contexts/SensorContext";

function SensorTypeSelector() {
  const { currentSensorType, setCurrentSensorType } = useSensorContext();

  const handleSensorButton = (type) => {
    setCurrentSensorType(type);
  };

  return (
    <Stack direction="row" spacing={2} sx={{ gridColumn: "1 / -1" }}>
      <Button
        variant={currentSensorType === "temperature" ? "contained" : "outlined"}
        onClick={() => handleSensorButton("temperature")}
        sx={{ margin: 1 }}
      >
        Temperature
      </Button>
      <Button
        variant={currentSensorType === "humidity" ? "contained" : "outlined"}
        onClick={() => handleSensorButton("humidity")}
        sx={{ margin: 1 }}
      >
        Humidity
      </Button>
      <Button
        variant={currentSensorType === "pressure" ? "contained" : "outlined"}
        onClick={() => handleSensorButton("pressure")}
        sx={{ margin: 1 }}
      >
        Pressure
      </Button>
    </Stack>
  );
}

export default SensorTypeSelector;
