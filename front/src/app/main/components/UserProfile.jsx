"use client";

import classNames from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const UserProfile = ({ userInfo, dogInfo, dogPhoto, children }) => {
  const baseDivClasses =
    "w-full h-fit flex flex-row justify-between items-center space-x-2 px-6 py-4";
  const profileDivClasses = "w-fit h-fit flex flex-row space-x-3";
  const profileImageClasses =
    "w-20 h-20 bg-grayBackground flex justify-center items-center rounded-full overflow-hidden";
  const profileInfoDivClasses =
    "flex flex-col justify-center items-start space-y-1";
  const userNameClasses = "w-36 text-sm text-grayText truncate";
  const dogNameClasses = "w-40 text-3xl font-semibold text-black truncate";
  const actionDivClasses =
    "w-fit h-fit p-3 rounded-full flex justify-center items-center";

  // userInfo, dogInfo, dogPhoto가 null 또는 undefined일 경우 기본 값 처리
  const safeUserInfo = userInfo || {};
  const safeDogInfo = dogInfo || {};
  const safeDogPhoto = dogPhoto || ""; // dogPhoto가 없을 때 기본 값

  return (
    <div className={baseDivClasses}>
      <div className={profileDivClasses}>
        <div className={profileImageClasses}>
          {safeDogPhoto ? (
            <Image
              src={safeDogPhoto}
              width={100}
              height={100}
              alt="User's pet"
            />
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
      </div>
      <div className={classNames(actionDivClasses)}>{children}</div>
    </div>
  );
};
