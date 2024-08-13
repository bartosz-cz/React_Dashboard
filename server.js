const express = require("express");
const path = require("path");
const { WebSocketServer } = require("ws");

const PORT = 80; // Using port 80 for HTTP and WebSocket

const app = express();

const interval = 1000; // Interval for sending data in milliseconds

let sessions = new Map();

// Serve static files from the React app build
app.use(express.static(path.join(__dirname, "build")));

// Catch all handler to return React's index.html for any request that doesn't match an API route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the server on the specified port
const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Set up the WebSocket server
const wss = new WebSocketServer({ noServer: true });

// Handle upgrade requests to establish WebSocket connections
server.on("upgrade", (request, socket, head) => {
  const pathname = request.url;
  console.log(`Handling upgrade request for: ${pathname}`);
  if (pathname === "/websocketserver/data") {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
});

wss.on("connection", (ws) => {
  const sessionId = generateSessionId();
  sessions.set(sessionId, ws);
  console.log(`WebSocket connection established: ${sessionId}`);

  // Send initial configuration message
  ws.send(
    "C,Voltage,V,Current,A,Pressure,Psi,Temperature,C,Frequency,Hz,Power,W,Speed,m/s,Load,kg,Altitude,m,Light,lux,Humidity,%,Torque,Nm,Displacement,m,Mass,kg,Angle,degrees,Time,s,Density,kg/m3,Viscosity,Pas,Energy,J,Force,N,Magnetism,Gauss,Acceleration,m/s2,Impedance,Ohms,Conductance,Siemens,Radiation,Bq,CO2 Level,ppm,pH,Level,Radiation Level,mSv,Wind Speed,km/h,Soil Moisture,%"
  );

  // Start periodic message sending
  const intervalId = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send(generateRandomData());
    } else {
      clearInterval(intervalId);
    }
  }, interval);

  ws.on("message", (message) => {
    console.log(`Received message from ${sessionId}: ${message}`);
    if (message === "config") {
      ws.send(
        "C,Voltage,V,Current,A,Pressure,Psi,Temperature,C,Frequency,Hz,Power,W,Speed,m/s,Load,kg,Altitude,m,Light,lux,Humidity,%,Torque,Nm,Displacement,m,Mass,kg,Angle,degrees,Time,s,Density,kg/m3,Viscosity,Pas,Energy,J,Force,N,Magnetism,Gauss,Acceleration,m/s2,Impedance,Ohms,Conductance,Siemens,Radiation,Bq,CO2 Level,ppm,pH,Level,Radiation Level,mSv,Wind Speed,km/h,Soil Moisture,%"
      );
    }
  });

  ws.on("close", () => {
    console.log(`WebSocket connection closed: ${sessionId}`);
    clearInterval(intervalId);
    sessions.delete(sessionId);
  });

  ws.on("error", (error) => {
    console.log(`Error: ${sessionId} - ${error}`);
    clearInterval(intervalId);
    sessions.delete(sessionId);
  });
});

function generateSessionId() {
  return Math.random().toString(36).substr(2, 9);
}

function generateRandomData() {
  let data = [
    Math.floor(Math.random() * 231), // Voltage
    Math.floor(Math.random() * 31), // Current
    Math.floor(Math.random() * 151), // Pressure
    Math.floor(Math.random() * 126) - 40, // Temperature
    Math.floor(Math.random() * 19981) + 20, // Frequency
    Math.floor(Math.random() * 5001), // Power
    Math.floor(Math.random() * 101), // Speed
    Math.floor(Math.random() * 1001), // Load
    Math.floor(Math.random() * 9149) - 300, // Altitude
    Math.floor(Math.random() * 100001), // Light
    Math.floor(Math.random() * 101), // Humidity
    Math.floor(Math.random() * 201), // Torque
    Math.floor(Math.random() * 10), // Displacement
    Math.floor(Math.random() * 501), // Mass
    Math.floor(Math.random() * 361), // Angle
    Math.floor(Math.random() * 86401), // Time
    Math.floor(Math.random() * 1701) + 500, // Density
    Math.floor(Math.random() * 101), // Viscosity
    Math.floor(Math.random() * 10001), // Energy
    Math.floor(Math.random() * 1001), // Force
    Math.floor(Math.random() * 1001), // Magnetism
    (Math.random() * 9.81).toFixed(2), // Acceleration
    Math.floor(Math.random() * 1001), // Impedance
    Math.floor(Math.random()), // Conductance
    Math.floor(Math.random() * 10001), // Radiation
    Math.floor(Math.random() * 3701) + 300, // CO2 Level
    Math.floor(Math.random() * 14), // pH Level
    Math.floor(Math.random() * 10), // Radiation Level
    Math.floor(Math.random() * 201), // Wind Speed
    Math.floor(Math.random() * 101), // Soil Moisture
  ];
  return data.join(",");
}

console.log(
  `WebSocket server is running at ws://127.0.0.1:${PORT}/websocketserver/data`
);
