"use client";
import { useState, useEffect } from "react";
// import "../styles/style.css";

export default function Page() {
  const hardcodedDeviceId = process.env.HARDCODED_DEVICE_ID;
  const serviceUuid = process.env.NEXT_PUBLIC_SERVICE_UUID; // 변수명 변경
  const txCharUuid = process.env.NEXT_PUBLIC_TX_CHAR_UUID; // 변수명 변경
  const rxCharUuid = process.env.NEXT_PUBLIC_RX_CHAR_UUID; // 변수명 변경
  const sampleSize = Number(process.env.NEXT_PUBLIC_SAMPLE_SIZE); // 변수명 변경

  const timestampOffset = Number(process.env.NEXT_PUBLIC_TIMESTAMP_OFFSET); // 변수명 변경
  const dataOffset = Number(process.env.NEXT_PUBLIC_DATA_OFFSET); // 변수명 변경
  const bcgOffset = Number(process.env.NEXT_PUBLIC_BCG_OFFSET); // 변수명 변경
  const axOffset = Number(process.env.NEXT_PUBLIC_AX_OFFSET); // 변수명 변경
  const ayOffset = Number(process.env.NEXT_PUBLIC_AY_OFFSET); // 변수명 변경
  const azOffset = Number(process.env.NEXT_PUBLIC_AZ_OFFSET); // 변수명 변경
  const gxOffset = Number(process.env.NEXT_PUBLIC_GX_OFFSET); // 변수명 변경
  const gyOffset = Number(process.env.NEXT_PUBLIC_GY_OFFSET); // 변수명 변경
  const gzOffset = Number(process.env.NEXT_PUBLIC_GZ_OFFSET); // 변수명 변경
  const tempOffset = Number(process.env.NEXT_PUBLIC_TEMP_OFFSET); // tempOffset 변수 추가

  const [device, setDevice] = useState(null);
  const [data, setData] = useState([]);

  const connectToDevice = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: [serviceUuid] }], // serviceUuid 변수명 사용
        optionalServices: [serviceUuid] // serviceUuid 변수명 사용
      });

      if (device.id !== hardcodedDeviceId) {
        console.log(device.id, 'device.id');
        console.log(hardcodedDeviceId, 'hardcodedDevice');
        console.log("The selected device does not match the hardcoded ID.");
        // return;
      }

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(serviceUuid); // serviceUuid 변수명 사용
      const txCharacteristic = await service.getCharacteristic(txCharUuid); // txCharUuid 변수명 사용
      const rxCharacteristic = await service.getCharacteristic(rxCharUuid); // rxCharUuid 변수명 사용

      await txCharacteristic.startNotifications();
      txCharacteristic.addEventListener("characteristicvaluechanged", handleCharacteristicValueChanged);

      const initCommand = hexStringToByteArray("FAFA0000000016000100FEFE");
      await rxCharacteristic.writeValue(initCommand);

      setDevice(device);
      console.log("Connected to Bluetooth device:", device);

    } catch (error) {
      console.error("Failed to connect to Bluetooth device:", error);
    }
  };

  const handleCharacteristicValueChanged = (event) => {
    const value = event.target.value;
    const buffer = new DataView(value.buffer);
    const head = buffer.getInt16(0, true);
    const wdid = buffer.getUint32(2, true);
    const type = buffer.getUint16(6, true);

    if (type === 0x11) { // Sense 1 data type
      const timestamp = buffer.getBigUint64(timestampOffset, true); // timestampOffset 변수명 사용
      let newData = [];
      for (let i = 0; i < 7; i++) {
        const idx = i * sampleSize + dataOffset; // sampleSize와 dataOffset 변수명 사용
        const time = Number(timestamp) + 10 * i;

        const bcg = buffer.getInt16(idx + bcgOffset, true); // bcgOffset 변수명 사용
        const ax = buffer.getInt16(idx + axOffset, true); // axOffset 변수명 사용
        const ay = buffer.getInt16(idx + ayOffset, true); // ayOffset 변수명 사용
        const az = buffer.getInt16(idx + azOffset, true); // azOffset 변수명 사용
        const gx = buffer.getInt16(idx + gxOffset, true); // gxOffset 변수명 사용
        const gy = buffer.getInt16(idx + gyOffset, true); // gyOffset 변수명 사용
        const gz = buffer.getInt16(idx + gzOffset, true); // gzOffset 변수명 사용
        const temp = buffer.getInt16(idx + tempOffset, true); // tempOffset 변수명 사용

        newData.push({
          timestamp: time,
          bcg,
          ax, ay, az,
          gx, gy, gz,
          temp // 온도 데이터 추가
        });
      }

      setData(prevData => [...newData, ...prevData]); // 최신 데이터를 가장 위에 추가
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
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>Bluetooth Device Connector</h1>
      <button onClick={connectToDevice}>Connect to Bluetooth Device</button>

      <div className="data-display">
        <h2>Received Data:</h2>
        {data.length > 0 ? (
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                Timestamp: {item.timestamp}, BCG: {item.bcg}, AX: {item.ax}, AY: {item.ay}, AZ: {item.az}, 
                GX: {item.gx}, GY: {item.gy}, GZ: {item.gz}, Temp: {item.temp} {/* 온도 데이터 표시 */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No data received yet.</p>
        )}
      </div>
    </main>
  );
}
