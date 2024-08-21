"use client";

import { Screen, Row, Module } from "@/components";
import {
  MainHeader,
  DogInfoModule,
  HeartRateModule,
  TemperatureModule,
  RespirationModule,
} from "./components";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const

  const userInfo = {
    loginId: "pelikan",
    name: "김동욱",
  };

  const dogInfo = {
    dogName: "복실이",
    breed: "치와와",
    breedCategory: 1,
    dogAge: 7,
    sex: "male",
    weight: 4.5,
  };

  const wsData = {
    // 임의로 구성
    bcgData: [
      {
        time: "2021-10-01 12:00:00",
        heartRate: 60,
        breathRate: 12,
        temperature: 36.5,
      },
    ],
  };

  return (
    <Screen nav>
      <MainHeader userInfo={userInfo} dogInfo={dogInfo} />

      <div className="w-full h-fit flex flex-col px-6 pb-6 space-y-4">
        <DogInfoModule dogInfo={dogInfo} />
      </div>

      <span className="w-full h-fit px-6 py-2 font-medium">건강 정보</span>
      <div className="w-full h-full flex flex-col px-6 space-y-4">
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
      </div>
    </Screen>
  );
}
