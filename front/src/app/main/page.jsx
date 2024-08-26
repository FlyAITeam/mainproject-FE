"use client";

import classNames from "classnames";
import { Screen, Row, Module, Icon, Modal, Notify } from "@/components";
import {
  UserProfile,
  HeartRateModule,
  TemperatureModule,
  RespirationModule,
  IntensityModule,
  ExerciseChart,
  HeartChart,
  SequenceChart,
} from "./components";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/libs/authManager";
import { getDogInfo, getDogPhoto } from "@/libs/petInfoManager";
import useModalStore from "@/stores/store";
import DeviceConnector from "@/components/DeviceConnector";
import {
  getHeartData,
  getExerciseData,
  getSequences,
} from "@/libs/getAnalysis";

export default function Page() {
  const router = useRouter();
  const [webSocket, setWebSocket] = useState(null);
  const [isConnectedBLE, setIsConnectedBLE] = useState(true);

  const [userInfo, setUserInfo] = useState(null);
  const [dogInfo, setDogInfo] = useState(null);
  const [dogPhoto, setDogPhoto] = useState(null);

  // 건강정보1 - 심박수, 호흡수, 체온
  const [heartRate, setHeartRate] = useState(0);
  const [respiration, setRespiration] = useState(0);
  const [temperature, setTemperature] = useState(0);

  // 건강정보2 - 운동량, 심박값 변이, 심박수 변이
  const [exerciseData, setExerciseData] = useState({ target: 100, today: 0 });
  const [heartData, setHeartData] = useState([{time: 1000, heartRate: 0}]);
  const [sequenceData, setSequenceData] = useState([
    { startTime: 1724524010.631, endTime: 1724524143.424,
      intensity: 1, heartAnomaly: false, heartRate: 0 }
  ]);

  // 건강정보3 - 현재상태
  const [intensity, setIntensity] = useState(0);

  useEffect(() => {
    const initializeWebSocket = async () => {
      const ws = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL);
      ws.onopen = async () => {
        const initialMessage = {
          accessToken: localStorage.getItem("accessToken") || "",
        };
        await ws.send(JSON.stringify(initialMessage));
        console.log(ws);
      };
      ws.onmessage = (event) => {
        const response = JSON.parse(event.data);
        console.log("Received from server:", response);

        // 1. 심박수
        try{
          setHeartRate(response.heartRate);
          console.log("heartRate", response.heartRate);
        }catch(e){
          console.log(e);
        }

        // 2. 호흡수
        try{
          setRespiration(response.respirationRate);
          console.log("respiration", response.respirationRate);
        }catch(e){
          console.log(e);
        }

        // 3. 이상 심박수
        try{
          setHeartData(response.heartAnomaly);
          console.log("heartAnomaly", response.heartAnomaly);
        }catch(e){
          console.log(e);
        }

        // 4. 심박값 변이
        try{
          setHeartData(response.senseData);
          console.log("senseData", response.senseData);
        }catch(e){
          console.log(e);
        }
      };
      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
      setWebSocket(ws);
    };

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
    initializeWebSocket();
    loadData();
    loadHeartData();
    loadExerciseData();
    loadSequences();
  }, []);

  const loadHeartData = async () => {
    console.log("심박값 데이터 불러오기");
    try {
      const data = await getHeartData();
      console.log('heart data from', data.bcgData);
      await setHeartData(data.bcgData);
      await setIntensity(data.intensity);
    } catch (error) {
      console.error("심박값 데이터를 불러오는 중 오류 발생:", error);
      await setHeartData([{time: 0, heartRate: 100}]);
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
        today: Math.max(Math.min(data.today, data.target),0) 
      });
    } catch (error) {
      console.error("운동량 데이터를 불러오는 중 오류 발생:", error);
      await setExerciseData({ target: 100, today: 0 });
    }
  };

  const loadSequences = async () => {
    console.log("시퀀스 데이터 불러오기");
    try {
      const data = await getSequences();
      console.log("Sequence data:", data.sequenceDatas);
      setSequenceData(data.sequenceDatas);
    } catch (error) {
      console.error("시퀀스 데이터를 불러오는 중 오류 발생:", error);
    }
  };


  const wsData = {
    bcgData: [
      {
        intensity: 0,
        time: "2021-10-01 12:00:00",
        heartRate: 60,
        breathRate: 12,
        temperature: 38.5,
      },
    ],
  };

  const topDivClasses = "w-full h-fit px-6 mb-4";
  const contentHeaderClasses =
    "w-full h-fit flex flex-row justify-between items-center px-6 mb-2 ";
  const headerTextClasses = "w-full h-fit flex font-medium mb-2";
  const contentDivClasses = "w-full h-full flex flex-col space-y-4";
  const guideDivClasses =
    "w-full h-48 flex flex-col justify-center items-center px-6 active:opacity-50";

  return (
    <Screen nav>
      <UserProfile userInfo={userInfo} dogInfo={dogInfo} dogPhoto={dogPhoto}>
        <DeviceConnector 
          webSocket={webSocket} 
          setTemperature={setTemperature}
          setHeartRate={setHeartRate}
          setRespiration={setRespiration}
        />
      </UserProfile>
      <div className={topDivClasses}>
        <div className={headerTextClasses}>현재 상태</div>
        <IntensityModule intensity={intensity} />
      </div>
      <div className={topDivClasses}>
        <div className={headerTextClasses}>건강 정보</div>
        <div className={contentDivClasses}>
          {isConnectedBLE ? (
            <>
              <Row gap="4">
                <HeartRateModule heartRate={heartRate} />
                <RespirationModule respiration={respiration} />
              </Row>
              <TemperatureModule temperature={temperature} />
              <Module
                title="운동량"
                className="w-full"
                reload={() => loadExerciseData()}
                getDetail={() => console.log("getDetail")}
              >
                <div className="w-full h-48">
                  <ExerciseChart
                    target={exerciseData.target}
                    today={exerciseData.today}
                  />
                </div>
              </Module>
              <Module
                title="심박값 변이"
                className="w-full"
                reload={() => loadHeartData()}
                getDetail={() => console.log("getDetail")}
              >
                <div className="w-full h-48">
                  <HeartChart bcgData={heartData} />
                </div>
              </Module>
              <Module
                title="심박수 변이"
                className="w-full"
                reload={() => loadSequences()}
                getDetail={() => console.log("getDetail")}
              >
                <div className="w-full h-48">
                  <SequenceChart sequenceData={sequenceData}/>
                </div>
              </Module>
            </>
          ) : (
            <Module className="w-full">
              <div
                onClick={() => {
                  /** TODO : 블루투스 연결하기 @안호준 */
                  console.log("블루투스 연결하기");
                }}
                className={guideDivClasses}
              >
                <div className="w-fit h-fit p-4 border border-green rounded-full flex justify-center items-center text-green mb-4 animate-heartbeat">
                  <Icon icon="add" className="text-green" size="20" />
                </div>
                <div className="flex flex-row  space-x-1 justify-center items-center text-green mb-1">
                  <Icon icon="bluetooth" className="text-green" size="18" />
                  <p className="text-md font-medium">블루투스 연결하기</p>
                </div>
                <p className="text-xs text-grayText text-wrap w-40 text-center ">
                  반려견의 건강 정보를 확인하려면 블루투스를 연결해주세요.
                </p>
              </div>
            </Module>
          )}
        </div>
      </div>
      {/* <WebSocketTest /> */}
    </Screen>
  );
}