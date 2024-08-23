"use client";
import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react"; // Headless UI의 Switch 컴포넌트를 사용합니다.

export default function WebSocketBluetoothSwitch() {
  const [ws, setWs] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [wsStatus, setWsStatus] = useState("Closed");
  const [device, setDevice] = useState(null);

  const serviceUuid = process.env.NEXT_PUBLIC_SERVICE_UUID;
  const txCharUuid = process.env.NEXT_PUBLIC_TX_CHAR_UUID;
  const rxCharUuid = process.env.NEXT_PUBLIC_RX_CHAR_UUID;
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (enabled) {
      connectAndAuthenticate();
    } else {
      closeConnections();
    }
  }, [enabled]);

  useEffect(() => {
    if (authSuccess && enabled) {
      connectToDeviceAndCollectData();
    }
  }, [authSuccess, enabled]);

  const connectAndAuthenticate = async () => {
    const websocket = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL);

    websocket.onopen = () => {
      console.log("Connected to WebSocket");
      setWs(websocket);
      setWsStatus("Open");

      const initialMessage = {
        accessToken: localStorage.getItem("accessToken") || "",
      };
      websocket.send(JSON.stringify(initialMessage));
    };

    websocket.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.auth_success !== undefined) {
        setAuthSuccess(response.auth_success);
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
  };

  const connectToDeviceAndCollectData = async () => {
    if (!authSuccess) {
      console.error("You need to authenticate first!");
      return;
    }
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: [serviceUuid] }],
        optionalServices: [serviceUuid],
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(serviceUuid);
      const txCharacteristic = await service.getCharacteristic(txCharUuid);
      const rxCharacteristic = await service.getCharacteristic(rxCharUuid);

      await txCharacteristic.startNotifications();
      txCharacteristic.addEventListener(
        "characteristicvaluechanged",
        handleCharacteristicValueChanged
      );

      const initCommand = hexStringToByteArray("FAFA0000000016000100FEFE");
      await rxCharacteristic.writeValue(initCommand);

      setIsConnected(true);
      setDevice(device);
    } catch (error) {
      console.error("Failed to connect to Bluetooth device:", error);
    }
  };

  const handleCharacteristicValueChanged = (event) => {
    const value = event.target.value;
    const buffer = new DataView(value.buffer);
    const type = buffer.getUint16(6, true);

    if (type === 0x11) {
      const newData = processData(buffer);

      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ sensorData: newData }));
      } else {
        console.error("WebSocket is not open. Ready state:", ws?.readyState);
      }
    }
  };

  const processData = (buffer) => {
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
    const sampleSize = Number(process.env.NEXT_PUBLIC_SAMPLE_SIZE);

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

      newData.push({ time, ax, ay, az, bcg, gx, gy, gz, temperature });
    }
    return newData;
  };

  const closeConnections = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.close();
    }

    if (device && device.gatt.connected) {
      device.gatt.disconnect();
      setIsConnected(false);
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
    <div className="flex flex-col items-center justify-center h-full p-4 bg-gray-100">
      <h1 className="text-2xl font-semibold mb-6">WebSocket & Bluetooth Control</h1>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? 'bg-green-500' : 'bg-gray-300'}
          relative inline-flex items-center h-10 rounded-full w-20 transition-colors focus:outline-none`}
      >
        <span
          className={`${enabled ? 'translate-x-10' : 'translate-x-1'}
            inline-block w-8 h-8 transform bg-white rounded-full transition-transform`}
        />
      </Switch>
      <div className="mt-4">
        <p className="text-lg">WebSocket Status: {wsStatus}</p>
        <p className="text-lg">Bluetooth Connected: {isConnected ? 'Yes' : 'No'}</p>
        <p className="text-lg">Auth Success: {authSuccess !== null ? authSuccess.toString() : 'N/A'}</p>
      </div>
    </div>
  );
}
