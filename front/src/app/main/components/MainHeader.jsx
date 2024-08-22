"use client";

import Image from "next/image";
import { Icon } from "@/components";

export const MainHeader = ({ userInfo, dogInfo, dogPhoto }) => {
  const baseDivClasses =
    "w-full h-fit flex flex-row justify-between items-center space-x-2 p-6";
  const profileDivClasses = "w-fit h-fit flex flex-row space-x-3";
  const profileImageClasses =
    "w-20 h-20 bg-grayBackground rounded-full overflow-hidden flex";
  const profileInfoDivClasses =
    "flex flex-col justify-center items-start space-y-1";
  const userNameClasses = "text-sm text-center text-grayText";
  const dogNameClasses = "text-3xl font-semibold text-black";
  const notiDivClasses =
    "w-fit h-fit p-3 bg-grayBackground rounded-full flex justify-center items-center";

  return (
    <div className={baseDivClasses}>
      <div className={profileDivClasses}>
        <div className={profileImageClasses}>
          {dogPhoto ? (
            <Image src={dogPhoto} width={100} height={100} alt="User's pet" />
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className={profileInfoDivClasses}>
          <p className={userNameClasses}>
            {userInfo ? <>{userInfo.name}님의</> : <div>Loading...</div>}
          </p>
          <p className={dogNameClasses}>
            {dogInfo ? <>{dogInfo.dogName}</> : <div>Loading...</div>}
          </p>
        </div>
      </div>
      <div className={notiDivClasses}>
        <Icon icon="bell" className="text-black" size="24" />
      </div>
    </div>
  );
};
