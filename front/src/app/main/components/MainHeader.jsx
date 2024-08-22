"use client";

import Image from "next/image";
import { Icon } from "@/components";

export const MainHeader = ({ userInfo, dogInfo, dogPhoto }) => {
  // userInfo나 dogInfo가 null일 경우를 대비하여 안전하게 처리
  if (!userInfo || !dogInfo || !dogPhoto) {
    return <div>Loading...</div>; // 데이터를 로드하는 동안 로딩 상태를 표시
  }

  return (
    <div className="w-full h-fit flex flex-row justify-between items-center space-x-2 p-6">
      <div className="w-fit h-fit flex flex-row space-x-3">
        <div className="w-20 h-20 bg-grayBackground rounded-full overflow-hidden flex">
          <Image src={dogPhoto} width={100} height={100} alt="User's pet" />
        </div>
        <div className="flex flex-col justify-center items-start space-y-1">
          <p className="text-sm text-center text-grayText">
            {userInfo.name}님의
          </p>
          <p className="text-3xl font-semibold text-black">{dogInfo.dogName}</p>
        </div>
      </div>
      <div className="w-fit h-fit p-3 bg-grayBackground rounded-full flex justify-center items-center">
        <Icon icon="bell" className="text-black" size="24" />
      </div>
    </div>
  );
};
