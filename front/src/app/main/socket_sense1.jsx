"use client"
import { useEffect, useState } from "react";
import { Button } from "@/components";

export default function WebSocketTest() {
  const [ws, setWs] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(null);
  const [message, setMessage] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);
  const [wsStatus, setWsStatus] = useState("Closed");
  const [device, setDevice] = useState(null); // Bluetooth device state

  const serviceUuid = process.env.NEXT_PUBLIC_SERVICE_UUID;
  const txCharUuid = process.env.NEXT_PUBLIC_TX_CHAR_UUID;
  const rxCharUuid = process.env.NEXT_PUBLIC_RX_CHAR_UUID;
  const sampleSize = Number(process.env.NEXT_PUBLIC_SAMPLE_SIZE);
  const timestampOffset = Number(process.env.NEXT_PUBLIC_TIMESTAMP_OFFSET);
  const dataOffset = Number(process.env.NEXT_PUBLIC_DATA_OFFSET);
  const bcgOffset = Number(process.env.NEXT_PUBLIC_BCG_OFFSET);
  const axOffset = Number(process.env.NEXT_PUBLIC_AX_OFFSET);
  const ayOffset = Number(process.env.NEXT_PUBLIC_AY_OFFSET);
  const azOffset = Number(process.env.NEXT_PUBLIC_AZ_OFFSET);
  const gxOffset = Number(process.env.NEXT_PUBLIC_GX_OFFSET);
  const gyOffset = Number(process.env.NEXT_PUBLIC_GY_OFFSET);
  const gzOffset = Number(process.env.NEXT_PUBLIC_GZ_OFFSET);
  const tempOffset = Number(process.env.NEXT_PUBLIC_TEMP_OFFSET);

  useEffect(() => {
    const websocket = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL);

    websocket.onopen = () => {
      console.log("Connected to WebSocket");
      setWs(websocket);
      setWsStatus("Open");
    };

    websocket.onmessage = (event) => {
      const response = JSON.parse(event.data);
      console.log("Received from server:", response);

      if (response.auth_success !== undefined) {
        setAuthSuccess(response.auth_success);
      }
      if (response.message) {
        setMessage(response.message);
      }
      if (response.accessToken) {
        setAccessToken(response.accessToken);
      }
      if (response.confirmation) {
        setServerResponse(response.confirmation);
        console.log("Server confirmed reception:", response.confirmation);
      }
    };

    websocket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setWsStatus("Error");
    };

    websocket.onclose = () => {
      console.log("WebSocket connection closed");
      setWs(null);
      setWsStatus("Closed");
    };

    return () => {
      console.log("Cleaning up WebSocket connection");
      websocket.close();
      setWsStatus("Closed");
    };
  }, []);

  const sendAccessToken = async () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const initialMessage = {
        accessToken: localStorage.getItem("accessToken") || "",
      };
      console.log("Sending access token:", initialMessage);
      await ws.send(JSON.stringify(initialMessage));
    } else {
      console.error("WebSocket is not open. Ready state:", ws?.readyState);
    }
  };

  const connectToDeviceAndCollectData = async () => {
    if (!authSuccess) {
      console.error("You need to authenticate first!");
      return;
    }
    try {
      console.log("Requesting Bluetooth device...");
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: [serviceUuid] }],
        optionalServices: [serviceUuid]
      });

      console.log("Connecting to GATT server...");
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(serviceUuid);
      const txCharacteristic = await service.getCharacteristic(txCharUuid);
      const rxCharacteristic = await service.getCharacteristic(rxCharUuid);

      console.log("Starting notifications...");
      await txCharacteristic.startNotifications();
      txCharacteristic.addEventListener("characteristicvaluechanged", handleCharacteristicValueChanged);

      console.log("Sending initial command to device...");
      const initCommand = hexStringToByteArray("FAFA0000000016000100FEFE");
      await rxCharacteristic.writeValue(initCommand);

      setIsConnected(true);
      setDevice(device); // Save the device reference for later disconnection
      console.log("Device connected and data collection started");
    } catch (error) {
      console.error("Failed to connect to Bluetooth device:", error);
    }
  };

  const handleCharacteristicValueChanged = (event) => {
    console.log("Characteristic value changed, processing data...");
    const value = event.target.value;
    const buffer = new DataView(value.buffer);
    const head = buffer.getInt16(0, true);
    const wdid = buffer.getUint32(2, true);
    const type = buffer.getUint16(6, true);

    if (type === 0x11) {
      console.log("Processing sensor data...");
      const timestamp = buffer.getBigUint64(timestampOffset, true);
      let newData = [];
      for (let i = 0; i < 7; i++) {
        const idx = i * sampleSize + dataOffset;
        const time = Number(timestamp) + 10 * i;
        const bcg = buffer.getInt16(idx + bcgOffset, true);
        const ax = buffer.getInt16(idx + axOffset, true);
        const ay = buffer.getInt16(idx + ayOffset, true);
        const az = buffer.getInt16(idx + azOffset, true);
        const gx = buffer.getInt16(idx + gxOffset, true);
        const gy = buffer.getInt16(idx + gyOffset, true);
        const gz = buffer.getInt16(idx + gzOffset, true);
        const temperature = buffer.getFloat32(idx + tempOffset, true);

        newData.push({time, ax, ay, az, bcg, gx, gy, gz, temperature});
      }

      if (ws && ws.readyState === WebSocket.OPEN) {
        try {
          const sensorData = { senserData: newData };
          const sensorData1 = {
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
          // ws.send(JSON.stringify({ sensorData: newData }));
        } catch (sendError) {
          console.error("Failed to send data via WebSocket:", sendError);
        }
      } else {
        console.error("WebSocket is not open. Ready state:", ws?.readyState);
      }
    }
  };

  const closeConnections = () => {
    // Close WebSocket connection
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.close();
      console.log("WebSocket connection manually closed.");
    } else {
      console.error("WebSocket is already closed or not open.");
    }

    // Disconnect Bluetooth device
    if (device && device.gatt.connected) {
      device.gatt.disconnect();
      console.log("Bluetooth device manually disconnected.");
      setIsConnected(false);
    } else {
      console.error("Bluetooth device is not connected.");
    }
  };

  const hexStringToByteArray = (hexString) => {
    const bytes = [];
    for (let i = 0; i < hexString.length; i += 2) {
      bytes.push(parseInt(hexString.substr(i, 2), 16));
    }
    return new Uint8Array(bytes);
  };

  return (
    <div>
      <h1>WebSocket and Bluetooth Test</h1>
      <div>
        <Button onClick={sendAccessToken} disabled={authSuccess !== null}>
          1. Send Access Token
        </Button>
      </div>
      <div>
        <Button onClick={connectToDeviceAndCollectData} disabled={!authSuccess || isConnected}>
          2. Connect and Collect Data
        </Button>
      </div>
      <div>
        <Button onClick={closeConnections}>
          3. Close WebSocket and Bluetooth
        </Button>
      </div>
      <div>
        <p>Auth Success: {authSuccess !== null ? authSuccess.toString() : "N/A"}</p>
        <p>Message: {message}</p>
        <p>Access Token: {accessToken}</p>
        <p>WebSocket Status: {wsStatus}</p>
        <p>Server Response: {serverResponse}</p>
      </div>
    </div>
  );
}
