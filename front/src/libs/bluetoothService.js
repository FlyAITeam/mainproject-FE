const service_uuid = process.env.NEXT_PUBLIC_SERVICE_UUID;
const tx_char_uuid = process.env.NEXT_PUBLIC_TX_CHAR_UUID;
const rx_char_uuid = process.env.NEXT_PUBLIC_RX_CHAR_UUID;
const sample_size = Number(process.env.NEXT_PUBLIC_SAMPLE_SIZE);

const timestamp_offset = Number(process.env.NEXT_PUBLIC_TIMESTAMP_OFFSET);
const data_offset = Number(process.env.NEXT_PUBLIC_DATA_OFFSET);
const bcg_offset = Number(process.env.NEXT_PUBLIC_BCG_OFFSET);
const ax_offset = Number(process.env.NEXT_PUBLIC_AX_OFFSET);
const ay_offset = Number(process.env.NEXT_PUBLIC_AY_OFFSET);
const az_offset = Number(process.env.NEXT_PUBLIC_AZ_OFFSET);
const gx_offset = Number(process.env.NEXT_PUBLIC_GX_OFFSET);
const gy_offset = Number(process.env.NEXT_PUBLIC_GY_OFFSET);
const gz_offset = Number(process.env.NEXT_PUBLIC_GZ_OFFSET);

if (!service_uuid || !tx_char_uuid || !rx_char_uuid) {
  throw new Error('Bluetooth 서비스 UUID 또는 특성 UUID가 설정되지 않았습니다.');
}

async function get_device_id(){
  try {
    return "z+umLSu+TuZlrZKu7U7P4A==";
  } catch(error) {
    console.error("디바이스 ID를 가져오는 중 오류가 발생했습니다:", error);
    return null;
  }
}

export async function get_device() {
  try {
    const device_id = await get_device_id();
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [service_uuid] }],
      optionalServices: [service_uuid]
    });

    if (device && device.id !== device_id && device_id) {
      const error_message = "선택된 장치가 등록된 장치와 일치하지 않습니다.";
      console.log(error_message);
      return null;
    } else {
      console.log("디바이스가 성공적으로 연결되었습니다:", device);
      return device;
    }
  } catch (error) {
    console.error("블루투스 장치 연결 중 오류가 발생했습니다:", error);
    return null;
  }
}

export async function transfer_data(device, setData) {
  const handleCharacteristicValueChanged = (event) => {
    const value = event.target.value;
    const buffer = new DataView(value.buffer);

    const head = buffer.getInt16(0, true);
    const wdid = buffer.getUint32(2, true);
    const type = buffer.getUint16(6, true);

    if (type === 0x11) {
      const timestamp = buffer.getBigUint64(timestamp_offset, true);
      let newData = [];
      for (let i = 0; i < 7; i++) {
        const idx = i * sample_size + data_offset;
        const time = Number(timestamp) + 10 * i;

        const bcg = buffer.getInt16(idx + bcg_offset, true);
        const ax = buffer.getInt16(idx + ax_offset, true);
        const ay = buffer.getInt16(idx + ay_offset, true);
        const az = buffer.getInt16(idx + az_offset, true);
        const gx = buffer.getInt16(idx + gx_offset, true);
        const gy = buffer.getInt16(idx + gy_offset, true);
        const gz = buffer.getInt16(idx + gz_offset, true);

        newData.push({
          timestamp: time,
          bcg,
          ax, ay, az,
          gx, gy, gz
        });
      }

      console.log("새 데이터가 수신되었습니다:", newData);
      setData(prevData => [...prevData, ...newData]);
    }
  };

  const hexStringToByteArray = (hexString) => {
    const bytes = [];
    for (let i = 0; i < hexString.length; i += 2) {
      bytes.push(parseInt(hexString.substr(i, 2), 16));
    }
    return new Uint8Array(bytes);
  };

  try {
    const server = await device.gatt.connect();
    console.log("GATT 서버에 연결되었습니다:", server);
    const service = await server.getPrimaryService(service_uuid);
    const txCharacteristic = await service.getCharacteristic(tx_char_uuid);
    const rxCharacteristic = await service.getCharacteristic(rx_char_uuid);

    await txCharacteristic.startNotifications();
    txCharacteristic.addEventListener("characteristicvaluechanged", handleCharacteristicValueChanged);

    const initCommand = hexStringToByteArray("FAFA0000000016000100FEFE");
    await rxCharacteristic.writeValue(initCommand);

    console.log("초기화 명령이 전송되었습니다:", initCommand);
  } catch (error) {
    console.error("데이터 전송 중 오류가 발생했습니다:", error);
  }
}
