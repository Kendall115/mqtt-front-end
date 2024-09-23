import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { socket } from "../../socket";
import { LineChart } from "@mui/x-charts/LineChart";
import { useSensorContext } from "../../contexts/SensorContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

function SensorChart() {
  const { currentSensorId } = useSensorContext();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [chartData, setChartData] = useState({
    series: [{ data: [] }],
    xAxis: [{ data: [] }],
  });

  useEffect(() => {
    if (!currentSensorId) return;
    const formattedDate = selectedDate.format("YYYY-MM-DDTHH:mm");
    socket.emit(
      "get sensor values",
      currentSensorId,
      formattedDate,
      (readings) => {
        const values = readings.map((reading) => reading.value);
        const times = readings.map((reading) => {
          const localFormattedDate = new Date(reading.reading_time);
          return localFormattedDate;
        });

        setChartData({
          series: [{ data: values }],
          xAxis: [{ data: times, scaleType: "time" }],
        });
      }
    );
  }, [currentSensorId, selectedDate]);

  useEffect(() => {
    const handleNewReading = (data) => {
      if (!data) return;
      const newTime = new Date(data.reading_time);

      setChartData((prev) => ({
        series: [{ data: [...prev.series[0].data, data.value] }],
        xAxis: [{ data: [...prev.xAxis[0].data, newTime], scaleType: "time" }],
      }));
    };

    socket.on(`new data ${currentSensorId}`, handleNewReading);
    return () => {
      socket.off(`new data ${currentSensorId}`, handleNewReading);
    };
  }, [currentSensorId]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{ marginLeft: 4, marginTop: "1%", minWidth: "150px" }}
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
        />
      </LocalizationProvider>
      <div
        style={{
          width: "100%",
          height: "88%",
          gridColumn: "2 / -1",
          gridRowStart: 3,
        }}
      >
        <LineChart
          series={chartData.series}
          xAxis={chartData.xAxis}
          xField="data"
          yField="data"
          xAxisLabel="Reading Time (Hours)"
          yAxisLabel="Humidity (%)"
        />
      </div>
    </>
  );
}

export default SensorChart;
