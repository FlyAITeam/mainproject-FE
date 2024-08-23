"use client";

import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import classNames from "classnames";

export const ProfileSection = ({ userInfo, dogInfo, dogPhoto }) => {
  const profileImageClasses =
    "w-16 h-16 flex flex-col justify-center bg-grayBackground items-center rounded-full overflow-hidden";
  const profileInfoDivClasses =
    "w-fit h-fit flex flex-col justify-center items-center space-y-0";
  const userNameClasses =
    "w-36 text-3xl text-center font-semibold text-black truncate";
  const dogNameClasses = "w-36 text-lg text-center text-grayText";

  // userInfo, dogInfo, dogPhoto가 null 또는 undefined일 경우 기본 값 처리
  const safeUserInfo = userInfo || {};
  const safeDogInfo = dogInfo || {};
  const safeDogPhoto = dogPhoto || ""; // dogPhoto가 없을 때 기본 값

  return (
    <>
      <div className={profileImageClasses}>
        {dogPhoto ? (
          <Image src={safeDogPhoto} width={100} height={100} alt="User's pet" />
        ) : (
          <Skeleton circle={true} width={80} height={80} />
        )}
      </div>

      <div className={profileInfoDivClasses}>
        <p className={userNameClasses}>
          {safeUserInfo.name ? (
            <>{safeUserInfo.name}님의</>
          ) : (
            <Skeleton count={1} />
          )}
        </p>
        <p className={dogNameClasses}>
          {safeDogInfo.dogName ? (
            <>{safeDogInfo.dogName}</>
          ) : (
            <Skeleton count={1} />
          )}
        </p>
      </div>
    </>
  );
};
