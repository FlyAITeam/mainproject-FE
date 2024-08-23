"use client";

import classNames from "classnames";
import Image from "next/image";
import { Screen } from "@/components";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/libs/authManager";
import { getDogInfo, getDogPhoto } from "@/libs/petInfoManager";
import {
  BluetoothStatus,
  DogInfoModule,
  ListItems,
  Item,
  ProfileSection,
} from "./components";

export default function Page() {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState(null);
  const [dogInfo, setDogInfo] = useState(null);
  const [dogPhoto, setDogPhoto] = useState(null);

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

  const baseDivClasses =
    "w-full h-fit flex flex-col justify-start items-center space-y-4 px-6 pt-8 pb-10";
  const sectionClasses =
    "w-full h-fit rounded-lg flex flex-col justify-center items-center space-y-2";

  const connectedBLE = {
    device: "sense1",
    status: "connected",
    battery: 70,
  };

  return (
    <Screen nav>
      <div className={baseDivClasses}>
        <div className={sectionClasses}>
          <ProfileSection
            userInfo={userInfo}
            dogInfo={dogInfo}
            dogPhoto={dogPhoto}
          />
        </div>
        <div className={sectionClasses}>
          <span className="w-full h-fit text-md text-left font-medium text-black pt-4">
            반려견 정보 관리
          </span>
          <DogInfoModule dogInfo={dogInfo} />
          <Item />
          <span className="w-full h-fit text-md text-left font-medium text-black pt-4">
            블루투스 연결
          </span>
          <BluetoothStatus connectedBLE={connectedBLE} />
          <span className="w-full h-fit text-md text-left font-medium text-black pt-4">
            사용자 계정 관리
          </span>
          <ListItems />
        </div>
      </div>
    </Screen>
  );
}
