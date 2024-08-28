"use client";

import classNames from "classnames";
import { Screen, Row, Module, Icon, Modal, Notify, PetMap } from "@/components";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/libs/authManager";
import { getDogInfo, getDogPhoto } from "@/libs/petInfoManager";
import DeviceConnector from "@/components/DeviceConnector";
import {
  getHeartData,
  getExerciseData,
  getSequences,
} from "@/libs/getAnalysis";

import MapPageComponent from "@/app/map/MapPageComponent";
import MyPageComponent from "@/app/mypage/MyPageComponent";
import { usePageStore } from "@/stores/store";

import { UserProfile } from "@/app/main/components/UserProfile";

export default function Page() {
  const router = useRouter();
  const [webSocket, setWebSocket] = useState(null);
  const [isConnectedBLE, setIsConnectedBLE] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [dogInfo, setDogInfo] = useState(null);
  const [dogPhoto, setDogPhoto] = useState(null);

  const { page, setPage } = usePageStore();

  // 건강정보1 - 심박수, 호흡수, 체온
  const [heartRate, setHeartRate] = useState(0);
  const [respiration, setRespiration] = useState(0);
  const [temperature, setTemperature] = useState(0);

  // 건강정보2 - 운동량, 심박값 변이, 심박수 변이
  const [exerciseData, setExerciseData] = useState({ target: 100, today: 0 });
  const [heartData, setHeartData] = useState([{ time: 1000, heartRate: 0 }]);
  const [sequenceData, setSequenceData] = useState([]);

  // 건강정보3 - 현재상태
  const [intentsity, setintentsity] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedUserInfo = await getUserInfo();
        setUserInfo(fetchedUserInfo);

        const fetchedDogInfo = await getDogInfo();
        setDogInfo(fetchedDogInfo);

        const fetchedDogPhoto = await getDogPhoto();
        setDogPhoto(fetchedDogPhoto);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    };

    loadData();
    loadExerciseData();
  }, []);

  const loadHeartData = async () => {
    console.log("심박값 데이터 불러오기");
    try {
      const data = await getHeartData();
      console.log("heart data from", data.bcgData);
      await setHeartData(data.bcgData);
      await setintentsity(data.intentsity);
    } catch (error) {
      console.error("심박값 데이터를 불러오는 중 오류 발생:", error);
      await setHeartData([{ time: 0, heartRate: 100 }]);
    }
  };

  const loadExerciseData = async () => {
    console.log("운동량 데이터 불러오기");
    console.log(exerciseData);
    try {
      const data = await getExerciseData();
      console.log(data);
      await setExerciseData({
        target: data.target,
        today: Math.max(Math.min(data.today, data.target), 0),
      });
    } catch (error) {
      console.error("운동량 데이터를 불러오는 중 오류 발생:", error);
      await setExerciseData({ target: 100, today: 0 });
    }
  };

  return (
    <Screen nav>
      <UserProfile userInfo={userInfo} dogInfo={dogInfo} dogPhoto={dogPhoto}>
        <DeviceConnector
          setTemperature={setTemperature}
          setHeartRate={setHeartRate}
          setRespiration={setRespiration}
          setSequenceData={setSequenceData}
          setHeartData={setHeartData}
          setBLEOn={setIsConnectedBLE}
        />
      </UserProfile>
      <div className="mt-24 w-full min-h-fit">
        <MyPageComponent
          heartRate={heartRate}
          respiration={respiration}
          temperature={temperature}
          exerciseData={exerciseData}
          heartData={heartData}
          sequenceData={sequenceData}
          intentsity={intentsity}
          loadHeartData={loadHeartData}
          loadExerciseData={loadExerciseData}
        />
        <MapPageComponent />
      </div>
      {/* <WebSocketTest /> */}
    </Screen>
  );
}
