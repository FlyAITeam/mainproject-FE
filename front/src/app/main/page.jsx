"use client";

import classNames from "classnames";
import { Screen, Row, Module, Icon, Modal, Notify, PetMap } from "@/components";
import {
  UserProfile,
  HeartRateModule,
  TemperatureModule,
  RespirationModule,
  IntentsityModule,
  ExerciseChart,
  HeartChart,
  SequenceChart,
} from "./components";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { getUserInfo } from "@/libs/authManager";
import { getDogInfo, getDogPhoto } from "@/libs/petInfoManager";
import DeviceConnector from "@/components/DeviceConnector";
import {
  getHeartData, getExerciseData,
} from "@/libs/getAnalysis";

import MapPageComponent from "@/app/map/MapPageComponent";
import MyPageComponent from "@/app/mypage/MyPageComponent";
import { usePageStore } from "@/stores/store";

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
  const [intentsity, setIntentsity] = useState(0); 
  
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

    try{
      console.log(window.Tmapv2.Map);
    }catch(e){
      // F5: 새로고침
      window.location.reload();
    }
    
  }, []);

  const loadHeartData = async () => {
    try {
      const data = await getHeartData();
      await setHeartData(data.bcgData);
      await setIntentsity(data.intentsity);
    } catch (error) {
      console.error("심박값 데이터를 불러오는 중 오류 발생:", error);
      await setHeartData([{ time: 0, heartRate: 100 }]);
    }
  };

  const loadExerciseData = async () => {
    try {
      const data = await getExerciseData();
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
          setIntentsity={setIntentsity}
          setBLEOn={setIsConnectedBLE}
        />
      </UserProfile>
      <div
        id="cover"
        className="mt-24 w-screen h-full relative overflow-hidden "
      >
        <div
          id="main"
          className={classNames(
            "min-w-[100vw] absolute h-full overflow-y-scroll top-0 bg-grayBackground",
            page === 1 ? "z-10" : "z-0",
          )}
        >
          <MainPageComponent
            intentsity={intentsity}
            heartRate={heartRate}
            respiration={respiration}
            temperature={temperature}
            isConnectedBLE={isConnectedBLE}
            exerciseData={exerciseData}
            heartData={heartData}
            sequenceData={sequenceData}
            loadExerciseData={loadExerciseData}
            loadHeartData={loadHeartData}
          />
        </div>
        <div
          id="map"
          className={classNames(
            "min-w-[100vw] absolute h-full overflow-hidden top-0 bg-grayBackground",
            page === 2 ? "z-10" : "z-0",
          )}
        >
          <MapPageComponent />
        </div>
        <div
          id="mypage"
          className={classNames(
            "min-w-[100vw] absolute h-full overflow-y-scroll top-0 bg-grayBackground",
            page === 3 ? "z-10" : "z-0",
          )}
        >
          <MyPageComponent />
        </div>
      </div>
      {/* <WebSocketTest /> */}
    </Screen>
  );
}

// 여기서 어디가 잘못됐지? -> sequenceData를 Queue로 선언했는데, useState로 선언해야 했음
// 그럼 뭐 어떻게해야돼? -> sequenceData를 useState로 선언하고, useEffect에서 loadSequences를 호출하면 됨

const MainPageComponent = ({
  intentsity,
  heartRate,
  respiration,
  temperature,
  isConnectedBLE,
  exerciseData,
  heartData,
  sequenceData,
  loadExerciseData,
  loadHeartData,
}) => {
  const topDivClasses = "w-full h-fit px-6 mb-4";
  const contentHeaderClasses =
    "w-full h-fit flex flex-row justify-between items-center px-6 mb-2 ";
  const headerTextClasses = "w-full h-fit flex font-medium mb-2";
  const contentDivClasses = "w-full h-full flex flex-col space-y-4";
  const guideDivClasses =
    "w-full h-48 flex flex-col justify-center items-center px-6 active:opacity-50";

  return (
    <>
      <div className={classNames(topDivClasses)}>
        <div className={headerTextClasses}>현재 상태</div>
        <IntentsityModule intensity={intentsity} />
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
                // getDetail={() => console.log("getDetail")}
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
                // getDetail={() => console.log("getDetail")}
              >
                <div className="w-full h-48">
                  <HeartChart bcgData={heartData} />
                </div>
              </Module>
              <Module
                title="심박수 변이"
                className="w-full"
                reload={() => {
                  // console.log("곧 지우셈");
                }}
                // getDetail={() => console.log("getDetail")}
              >
                <div className="w-full h-48">
                  <SequenceChart sequenceData={sequenceData} />
                </div>
              </Module>
            </>
          ) : (
            <Module className="w-full">
              <div
                onClick={() => {
                  /** TODO : 블루투스 연결하기 @안호준 */
                  console.log("블루투스 연결하기");
                  // window.location.reload();
                }}
                className={guideDivClasses}
              >
                <div className="flex flex-row  space-x-1 justify-center items-center text-green mb-1">
                  {/* <Icon icon="bluetooth" className="text-green" size="18" /> */}
                  <p className="text-md font-medium">블루투스 연결하기</p>
                  <Icon icon="topRight" className="text-green" size="20" />
                </div> 
                {/* <p className="text-xs text-grayText text-wrap w-40 text-center ">
                  반려견의 건강정보를 불러오기 위해 블루투스를 연결해주세요.
                </p> */}
                <p className="text-xs text-grayText text-wrap w-40 text-center ">
                  상단에 위치한 블루투스 아이콘을 클릭해주세요.
                </p>
              </div>
            </Module>
          )}
        </div>
      </div>
    </>
  );
};
