"use client";
import React, { useState, useEffect } from 'react';

const DeviceConnector = ({
  webSocket, 
  setTemperature,
}) => {
  // 블루투스 장치의 UUID와 데이터 오프셋
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

  // Bluetooth device state
  const [isConnected, setIsConnected] = useState(false);
  const [device, setDevice] = useState(null); // Bluetooth device state
  const [sensorData, setSensorData] = useState([]); // State to store sensor data

  const connectToDeviceAndCollectData = async () => {
    try {
      await sendWebSocketMessage({ accessToken: localStorage.getItem("accessToken") || "" });
      try {
        // 블루투스 장치 요청        
        console.log("Requesting Bluetooth device..."); 
        const device = await navigator.bluetooth.requestDevice({
          filters: [{ services: [serviceUuid] }],
          optionalServices: [serviceUuid],
        });

        // GATT 서버에 연결: 블루투스 장치와 데이터 송수신
        console.log("Connecting to GATT server..."); 
        const server = await device.gatt.connect(); 
        const service = await server.getPrimaryService(serviceUuid); // 서비스 가져오기
        const txCharacteristic = await service.getCharacteristic(txCharUuid); // 송신 Characteristic
        const rxCharacteristic = await service.getCharacteristic(rxCharUuid); // 수신 Characteristic

        // 알림 시작: 데이터 수신
        console.log("Starting notifications...");
        await txCharacteristic.startNotifications();
        txCharacteristic.addEventListener(
          "characteristicvaluechanged",
          handleCharacteristicValueChanged,
        );

        // 초기 명령 전송
        console.log("Sending initial command to device...");
        const initCommand = hexStringToByteArray("FAFA0000000016000100FEFE");
        await rxCharacteristic.writeValue(initCommand);

        setIsConnected(true);
        setDevice(device); // Save the device reference for later disconnection
        console.log("Device connected and data collection started");
      } catch (error) {
        console.error("Failed to connect to Bluetooth device:", error);
        closeConnections();
        throw error; // 에러 발생 시 다시 off 상태로 전환하기 위해 에러를 throw
      }
    } catch (e) {
      console.log(e);
      throw e; // 에러 발생 시 다시 off 상태로 전환하기 위해 에러를 throw
    }
  };

  const handleCharacteristicValueChanged = async (event) => {
    // console.log("Characteristic value changed, processing data...");
    const value = event.target.value;
    const buffer = new DataView(value.buffer);

    const head = buffer.getInt16(0, true);
    const wdid = buffer.getUint32(2, true);
    const type = buffer.getUint16(6, true);

    if (type === 0x11) {
      console.log("Processing sensor data...");
      const timestamp = buffer.getBigUint64(timestampOffset, true);
      const kstOffset = 9 * 60 * 60 * 1000; // 한국 시간 오프셋 (9시간)
      const kstTime = Date.now() + kstOffset;
      const time_begin = Number(timestamp);
      let newData = [];
      for (let i = 0; i < 7; i++) {
        const idx = i * sampleSize + dataOffset;
        const time = Number(timestamp) + i * 10 + 1724502816481;
        const bcg = buffer.getInt16(idx + bcgOffset, true);
        const ax = buffer.getInt16(idx + axOffset, true);
        const ay = buffer.getInt16(idx + ayOffset, true);
        const az = buffer.getInt16(idx + azOffset, true);
        const gx = buffer.getInt16(idx + gxOffset, true);
        const gy = buffer.getInt16(idx + gyOffset, true);
        const gz = buffer.getInt16(idx + gzOffset, true);
        const temperature = buffer.getFloat32(idx + tempOffset, true) + 4.5;

        let temperature_print = parseFloat(temperature.toFixed(1));
        setTemperature(temperature_print);

        newData.push({ time, ax, ay, az, bcg, gx, gy, gz, temperature });
      }

      // console.log("New sensor data:", newData);
      try {
        await sendWebSocketMessage({ senserData: newData });
        console.log("box1");
      } catch (e) {
        console.log("box2");
        // closeConnections();
        const initialMessage = { accessToken: localStorage.getItem("accessToken") || "" };
        await sendWebSocketMessage(initialMessage);
      }

      setSensorData((prevData) => [...prevData, ...newData]); // Update sensor data state
    }
  };

  const sendWebSocketMessage = async (message) => {
    if (webSocket.readyState === WebSocket.OPEN) {
      console.log("await webSocket.send(JSON.stringify(message));");
      await webSocket.send(JSON.stringify(message));
    } else if (webSocket.readyState === WebSocket.CLOSED || webSocket.readyState === WebSocket.CLOSING) {
      console.log("WebSocket is closed or closing. Reconnecting...");
      const initialMessage = { accessToken: localStorage.getItem("accessToken") || "" };
      await webSocket.send(initialMessage);
      return;
      webSocket = new WebSocket(webSocket.url);
      webSocket.onopen = async () => {
        await webSocket.send(JSON.stringify(message));
      };
    }else{
      console.log("???? Nothing");
    }
  };

  const closeConnections = () => {
    // Disconnect Bluetooth device
    if (device && device.gatt.connected) {
      device.gatt.disconnect();
      console.log("Bluetooth device manually disconnected.");
      setIsConnected(false);
      setIsOn(false);
    } else {
      console.error("Bluetooth device is not connected.");
      setIsOn(false);
    }
  };

  const hexStringToByteArray = (hexString) => {
    const bytes = [];
    for (let i = 0; i < hexString.length; i += 2) {
      bytes.push(parseInt(hexString.substr(i, 2), 16));
    }
    return new Uint8Array(bytes);
  };

  const [isOn, setIsOn] = useState(false); // 초기 상태를 off로 설정
  const handleToggle = async () => {
    if (!isOn) {
      try {
        await connectToDeviceAndCollectData(); // 블루투스 장치에 연결하고 데이터 수집
        setIsOn(true);
      } catch (error) {
        console.error("Error occurred during ON logic:", error);
        setIsOn(false); // 에러 발생 시 다시 off 상태로 전환
      }
    } else {
      try {
        closeConnections(); // 연결을 끊음
        setIsOn(false);
      } catch (error) {
        console.error("Error occurred during OFF logic:", error);
      }
    }
  };

  const switchContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  };

  const switchStyle = {
    width: '60px',
    height: '30px',
    backgroundColor: isOn ? '#4caf50' : '#ccc',
    borderRadius: '15px',
    position: 'relative',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const circleStyle = {
    width: '26px',
    height: '26px',
    backgroundColor: 'white',
    borderRadius: '50%',
    position: 'absolute',
    top: '2px',
    left: '2px',
    transition: 'transform 0.3s',
    transform: isOn ? 'translateX(30px)' : 'none',
  };

  return (
    <div style={switchContainerStyle} onClick={handleToggle}>
      <div style={switchStyle}>
        <div style={circleStyle}></div>
      </div>
    </div>
  );
};

export default DeviceConnector;