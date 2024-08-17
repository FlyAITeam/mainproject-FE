// bluetoothService.js

// configs..
const service_uuid = process.env.SERVICE_UUID;
const tx_char_uuid = process.env.TX_CHAR_UUID;
const rx_char_uuid = process.env.RX_CHAR_UUID;
const sample_size = Number(process.env.SAMPLE_SIZE);

const timestamp_offset = Number(process.env.TIMESTAMP_OFFSET);
const data_offset = Number(process.env.DATA_OFFSET);
const bcg_offset = Number(process.env.BCG_OFFSET);
const ax_offset = Number(process.env.AX_OFFSET);
const ay_offset = Number(process.env.AY_OFFSET);
const az_offset = Number(process.env.AZ_OFFSET);
const gx_offset = Number(process.env.GX_OFFSET);
const gy_offset = Number(process.env.GY_OFFSET);
const gz_offset = Number(process.env.GZ_OFFSET);

// 등록된 유저 장치
async function get_device_id(){
  try{
    // it would be modified..
    return "xNEHQFkNtmvECKg3ybySfw==";
  }catch(error){
    // Server error.., or 
    return null;
  }
}

// 블루투스를 통한 Sense1식별 및 연결
export async function get_device() {
  try {
    const device_id = await get_device_id();  
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [service_uuid] }],
      optionalServices: [service_uuid]
    });

    if (device && device.id !== device_id) {
      const error_message = "선택된 장치가 등록된 장치와 일치하지 않습니다.";
      console.log(error_message);
      return null;
    } else {
      return device;
    }
  } catch (error) {
    console.error("블루투스 장치 연결 중 오류가 발생했습니다:", error);
    return null;
  }
}

// 데이터 통신
export async function transfer_data(device, setData){
  const handleCharacteristicValueChanged = (event) => {
    const value = event.target.value;
    const buffer = new DataView(value.buffer);

    const head = buffer.getInt16(0, true);
    const wdid = buffer.getUint32(2, true);
    const type = buffer.getUint16(6, true);

    if (type === 0x11) { // Sense 1 data type
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
    const service = await server.getPrimaryService(service_uuid);
    const txCharacteristic = await service.getCharacteristic(tx_char_uuid);
    const rxCharacteristic = await service.getCharacteristic(rx_char_uuid);

    await txCharacteristic.startNotifications();
    txCharacteristic.addEventListener("characteristicvaluechanged", handleCharacteristicValueChanged);

    const initCommand = hexStringToByteArray("FAFA0000000016000100FEFE");
    await rxCharacteristic.writeValue(initCommand);
  } catch (error) {
    console.error("데이터 전송 중 오류가 발생했습니다:", error);
  }
}