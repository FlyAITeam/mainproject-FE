"use client";

import classNames from "classnames";
import { Screen, Row, Module, Icon, Modal, Notify } from "@/components";
import {
  UserProfile,
  HeartRateModule,
  TemperatureModule,
  RespirationModule,
  IntensityModule,
  WebSocketTest,
} from "./components";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/libs/authManager";
import { getDogInfo, getDogPhoto } from "@/libs/petInfoManager";
import useModalStore from "@/stores/store";

export default function Page() {
  const router = useRouter();
  const { isModalOpen } = useModalStore();

  const [userInfo, setUserInfo] = useState(null);
  const [dogInfo, setDogInfo] = useState(null);
  const [dogPhoto, setDogPhoto] = useState(null);

  const [isConnectedBLE, setIsConnectedBLE] = useState(true);

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
  }, []);

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
      <Modal isModalOpen={isModalOpen} type="bcg" />
      <UserProfile
        userInfo={userInfo}
        dogInfo={dogInfo}
        dogPhoto={dogPhoto}
        onAction={() => {
          Notify();
        }}
      />
      <div className={topDivClasses}>
        <div className={headerTextClasses}>현재 상태</div>
        <IntensityModule intensity={wsData.bcgData[0].intensity} />
      </div>
      <div className={topDivClasses}>
        <div className={headerTextClasses}>건강 정보</div>
        <div className={contentDivClasses}>
          {isConnectedBLE ? (
            <>
              <Row gap="4">
                <HeartRateModule heartRate={wsData.bcgData[0].heartRate} />
                <RespirationModule respiration={wsData.bcgData[0].breathRate} />
              </Row>
              <TemperatureModule temperature={wsData.bcgData[0].temperature} />
              <Module
                title="심박수 변이"
                className="w-full"
                reload={() => console.log("reload")}
                getDetail={() => console.log("getDetail")}
              >
                <div className="w-full h-48"></div>
              </Module>
              <Module
                title="운동량"
                className="w-full"
                reload={() => console.log("reload")}
                getDetail={() => console.log("getDetail")}
              >
                <div className="w-full h-48"></div>
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
      <WebSocketTest />
    </Screen>
  );
}
