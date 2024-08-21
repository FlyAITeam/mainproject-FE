"use client";

import Image from "next/image";
import { Icon } from "@/components";

export const MainHeader = ({ userInfo, dogInfo }) => {
  return (
    <div className="w-full h-fit flex flex-row justify-between items-center space-x-2 p-6">
      <div className="w-fit h-fit flex flex-row space-x-3">
        <div className="w-20 h-20 bg-grayBackground rounded-full overflow-hidden flex">
          <Image src="/imgs/banner.png" width={100} height={100} />
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
