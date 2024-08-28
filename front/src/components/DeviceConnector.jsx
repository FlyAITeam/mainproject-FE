"use client";
import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Icon, Loading } from ".";
import { AnimatePresence, motion } from "framer-motion";

const DeviceConnector = ({
  setTemperature,
  setHeartData,
  setHeartRate,
  setSequenceData,
  setRespiration,
  setIntentsity,
  setBLEOn,
}) => {
  const [webSocket, setWebSocket] = useState(null);
  // 웹소켓 초기화

  // 배터리 레벨
  const [bleBatteryLevel, setBleBatteryLevel] = useState(0);

  //소켓 전송 완료 여부
  const [isSendData, setIsSendData] = useState(false);

  const initializeWebSocket = async () => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL);
    ws.onopen = async () => {
      // setInterval(function() {
      //   ws.send(JSON.stringify({ type: "ping" }));
      // }, 15000); // 15초마다 ping 메시지 전송
      const initialMessage = {
        accessToken: localStorage.getItem("accessToken") || "",
      };
      await ws.send(JSON.stringify(initialMessage));
      setWebSocket(ws);
    };

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      console.log("WebSocket message received..");

      // 1. 심박수 및 심박수 시퀀스
      try {
        setHeartRate(response.heartRate);
        setSequenceData((prevData) => [...prevData, response.heartRate]);
      } catch (e) {
        console.log(e);
      }

      // 2. 호흡수
      try {
        setRespiration(response.respirationRate);
      } catch (e) {
        console.log(e);
      }

      // 3. 이상 심박수
      try {
        const heartAnomaly = response.heartAnomaly;
        // 1일때, 푸시알림 설정
        // 생략
      } catch (e) {
        console.log(e);
      }

      // 4. 심박값 변이
      try {
        setHeartData(response.senseData);
      } catch (e) {
        console.log(e);
      }

      // 5. 활동상태
      try {
        // console.log(response.intentsity, "intentsity");
        setIntentsity(response.intentsity);
      } catch (e) {
        console.log(e);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket closed. Reconnecting...");
      // initializeWebSocket();
    };
  };
  useEffect(() => {
    initializeWebSocket();
  }, []);

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
  const [dataBox, setDataBox] = useState([]);

  const connectToDeviceAndCollectData = async () => {
    try {
      try {
        // 블루투스 장치 요청 (serviceUuid 필터링과 battery service 추가)
        console.log("Requesting Bluetooth device...", navigator.bluetooth);
        const device = await navigator.bluetooth.requestDevice({
          filters: [{ services: [serviceUuid] }],
          optionalServices: [serviceUuid, "battery_service"],
        });

        // GATT 서버에 연결: 블루투스 장치와 데이터 송수신
        console.log("Connecting to GATT server...");
        const server = await device.gatt.connect();
        const service = await server.getPrimaryService(serviceUuid); // 서비스 가져오기
        const txCharacteristic = await service.getCharacteristic(txCharUuid); // 송신 Characteristic
        const rxCharacteristic = await service.getCharacteristic(rxCharUuid); // 수신 Characteristic

        // 배터리 서비스 요청
        const batteryService =
          await server.getPrimaryService("battery_service");
        // 배터리 레벨 요청
        const batteryLevelChar =
          await batteryService.getCharacteristic("battery_level");
        const batteryLevel = await batteryLevelChar.readValue();
        setBleBatteryLevel(batteryLevel.getUint8(0));

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
      setIsSendData(false);
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
        const temperature = buffer.getFloat32(idx + tempOffset, true); // + 4.5;

        let temperature_print = parseFloat(temperature.toFixed(1));
        setTemperature(temperature_print);

        newData.push({ time, ax, ay, az, bcg, gx, gy, gz, temperature });
        // dataBox 도 push
        dataBox.push({ time, ax, ay, az, bcg, gx, gy, gz, temperature });
        // setDataBox(prevData => [...prevData, { time, ax, ay, az, bcg, gx, gy, gz, temperature }]);
      }

      //
      if (dataBox.length >= 70) {
        // 웹소켓 보내기 560묶음
        await sendWebSocketMessage({ senserData: dataBox });

        // 다시 지우기
        dataBox.splice(dataBox, dataBox.length);
      }

      // console.log("New sensor data:", newData);
      // setSensorData((prevData) => [...prevData, ...newData]); // Update sensor data state
    }
  };

  const sendWebSocketMessage = async (message) => {
    if (webSocket.readyState === WebSocket.OPEN) {
      await webSocket.send(JSON.stringify(message));
      setIsSendData(true);
      const date = new Date();
      console.log("Successfully sended..", date);
    } else if (
      webSocket.readyState === WebSocket.CLOSED ||
      webSocket.readyState === WebSocket.CLOSING
    ) {
      setIsSendData(false);
      setIsOn(false);
      setIsConnected(false);
      console.log("WebSocket is closed or closing. Reconnecting...");
    } else {
      setIsSendData(false);
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
        setBLEOn(true);
      } catch (error) {
        console.error("Error occurred during ON logic:", error);
        setIsOn(false); // 에러 발생 시 다시 off 상태로 전환
        setBLEOn(false);
      }
    } else {
      try {
        closeConnections(); // 연결을 끊음
        setIsOn(false);
        setBLEOn(false);
      } catch (error) {
        console.error("Error occurred during OFF logic:", error);
      }
    }
  };

  const bleDivClasses = "flex flex-col items-center justify-center space-y-1";

  const switchClasses =
    "w-16 h-8 relative cursor-pointer rounded-full p-1 transition duration-300 ease-in-out";

  const circleClasses =
    "w-6 h-6 absolute top-1 left-1 bg-white rounded-full shadow-md transform duration-300 ease-in-out flex justify-center items-center";

  const batteryDivClasses =
    "w-fit h-fit flex flex-row justify-center items-center space-x-1";

  const batteryTextClasses = "text-sm font-medium text-dimGray";

  return (
    <>
      {/* <AnimatePresence>
        {!isSendData && isOn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-fit flex flex-row space-x-2 justify-center items-center px-6 py-0 opacity-0 rounded-sm animate-pulse"
          >
            <span className="min-w-40 text-sm font-light text-dimGray">
              Processing Sender Data...
            </span>
            <Loading size={20} />
          </motion.div>
        )}
      </AnimatePresence> */}
      <div className={bleDivClasses} onClick={handleToggle}>
        <div
          className={classNames(
            switchClasses,
            isOn ? "bg-green" : "bg-dimGray",
          )}
        >
          <div
            className={classNames(
              circleClasses,
              isOn ? "translate-x-8" : "translate-x-0",
            )}
          >
            <Icon
              icon="bluetooth"
              className={classNames(isOn ? "text-green" : "text-dimGray")}
              size={22}
            />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isOn ? { opacity: 1 } : { opacity: 0 }}
          className={batteryDivClasses}
        >
          <div className={batteryTextClasses}>{bleBatteryLevel}%</div>
          <Icon
            className="text-dimGray "
            icon={
              bleBatteryLevel < 30
                ? "batteryDead"
                : bleBatteryLevel < 70
                  ? "batteryHalf"
                  : "batteryFull"
            }
            size="24"
          />
        </motion.div>
      </div>
    </>
  );
};

export default DeviceConnector;
