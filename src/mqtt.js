// mqttClient.js
import mqtt from "mqtt";

let mqttClient;

export const connectMqtt = (host = "localhost", port = 8000) => {
  if (mqttClient) {
    return mqttClient;
  }

  mqttClient = mqtt.connect({ host, port });

  mqttClient.on("connect", () => {
    console.log("Connected to MQTT broker");
  });

  mqttClient.on("message", (topic, message) => {
    console.log(`Received message from ${topic}:`, message.toString());
  });

  mqttClient.on("error", (err) => {
    console.error("Connection error:", err);
  });

  return mqttClient;
};

export const subscribeToTopic = (topic) => {
  if (!mqttClient) {
    console.error("MQTT client is not connected. Please connect first.");
    return;
  }

  mqttClient.subscribe(topic, (err) => {
    if (err) {
      console.error(`Error subscribing to topic ${topic}:`, err);
    }
  });
};

export const publishMessage = (topic, message) => {
  if (!mqttClient) {
    console.error("MQTT client is not connected. Please connect first.");
    return;
  }

  mqttClient.publish(topic, message);
};
