# MQTT Sensors Dashboard

This project is a real-time dashboard built with React, NodeJS and Python that visualizes data from MQTT sensors. It simulates various sensor readings.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Kendall115/mqtt-front-end.git
```

2. Navigate to the project directory:

```bash
cd mqtt-front-end
```

3. Install dependencies:

```bash
npm install
```

4. Usage

```javascript
npm run dev
```

## Configuration

Before running the application, configure the socket.js or use default config in src/socket.js

```javascript
import { io } from "socket.io-client";

const URL = "http://localhost:3000";

export const socket = io(URL);
```
