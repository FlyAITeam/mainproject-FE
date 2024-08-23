"use client"
import { useEffect, useState } from "react";

export default function WebSocketTest() {
  const [ws, setWs] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(null);
  const [message, setMessage] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const websocket = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL);

    websocket.onopen = () => {
      console.log("Connected to WebSocket");
      setWs(websocket);
    };

    websocket.onmessage = (event) => {
      const response = JSON.parse(event.data);

      if (response.auth_success !== undefined) {
        setAuthSuccess(response.auth_success);
      }
      if (response.message) {
        setMessage(response.message);
      }
      if (response.accessToken) {
        setAccessToken(response.accessToken);
      }
    };

    websocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    websocket.onclose = () => {
      console.log("WebSocket connection closed");
      setWs(null);
    };

    // Clean up WebSocket connection when component is unmounted
    return () => {
      websocket.close();
    };
  }, []);

  const sendAccessToken = () => {
    if (ws) {
      const initialMessage = {
        accessToken: localStorage.getItem("accessToken") || "",
      };
      console.log(initialMessage);
      ws.send(JSON.stringify(initialMessage));
    }
  };

  const sendSensorData = () => {
    console.log(JSON.stringify(sensorData));
    if (ws && authSuccess) {
      const sensorData = {
        senserData: [{
            time: 1716563008215,
            ax: 16236,
            ay: -1916,
            az: 780,
            bcg: 8105,
            gx: -60,
            gy: 19,
            gz: 73,
            temperature: 38.04188537597660,
          },
          {
            time: 1716563008224,
            ax: 16230,
            ay: -1912,
            az: 788,
            bcg: 8104,
            gx: -52,
            gy: 19,
            gz: 81,
            temperature: 38.04188537597660,
          },
          {
            time: 1716563008234,
            ax: 16230,
            ay: -1926,
            az: 778,
            bcg: 8111,
            gx: -47,
            gy: 18,
            gz: 94,
            temperature: 38.04188537597660,
          },
          {
            time: 1716563008244,
            ax: 16246,
            ay: -1922,
            az: 780,
            bcg: 8111,
            gx: -59,
            gy: 17,
            gz: 97,
            temperature: 38.04188537597660,
          },
          {
            time: 1716563008254,
            ax: 16234,
            ay: -1916,
            az: 778,
            bcg: 8112,
            gx: -50,
            gy: 17,
            gz: 104,
            temperature: 38.04188537597660,
          },
          {
            time: 1716563008264,
            ax: 16244,
            ay: -1914,
            az: 778,
            bcg: 8111,
            gx: -61,
            gy: 16,
            gz: 97,
            temperature: 38.04188537597660,
          },
          {
            time: 1716563008275,
            ax: 16256,
            ay: -1918,
            az: 784,
            bcg: 8109,
            gx: -61,
            gy: 14,
            gz: 94,
            temperature: 38.04188537597660,
          },
        ],
      };
      ws.send(JSON.stringify(sensorData));
    }
  };

  return (
    <div>
      <h1>WebSocket Test</h1>
      <button onClick={sendAccessToken}>Send Access Token</button>
      <button onClick={sendSensorData} disabled={!authSuccess}>
        Send Sensor Data
      </button>
      <div>
        <p>Auth Success: {authSuccess !== null ? authSuccess.toString() : "N/A"}</p>
        <p>Message: {message}</p>
        <p>Access Token: {accessToken}</p>
      </div>
    </div>
  );
}
