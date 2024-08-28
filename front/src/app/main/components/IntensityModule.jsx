"use client";

import classNames from "classnames";
import { Module } from "@/components";
import { motion } from "framer-motion";
import SleepDog from "@/svgs/icons/sleepdog.svg";
import StandDog from "@/svgs/icons/standdog.svg";

export const intentsityModule = ({ intentsity }) => {
  // 상태별 설명을 위한 텍스트
  const intentsityText = [
    "반려견이 수면 중입니다.",
    "반려견이 비수면 상태입니다.",
  ];

  const intentsityDetailText = [
    "수면 상태에서는 이상 징후를 탐지합니다.",
    "수면상태가 아닐 때는 건강 정보가 부정확하며, 이상 징후를 확인할 수 없습니다.",
  ];

  return (
    <Module className="w-full">
      <div className="w-full h-fit flex flex-row space-x-4 justify-start items-center overflow-hidden">
        {/* 왼쪽 상태 표현 영역 */}
        <motion.div
          className="w-fit h-fit flex flex-col justify-center items-center rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {intentsity === 0 ? (
            <SleepDog className="w-16 h-12 bg-white py-2 rounded-2xl " />
          ) : (
            <StandDog className="w-16 h-12 bg-white py-2 rounded-2xl" />
          )}
        </motion.div>

        {/* 오른쪽 설명 영역 */}
        <div className="w-full h-fit flex flex-col justify-center items-start">
          <motion.p
            className="text-sm text-black"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {intentsityText[intentsity === 0 ? 0 : 1]}
          </motion.p>
          <motion.p
            className={classNames(
              "w-full h-fit text-xs break-keep",
              intentsity === 0 ? "text-orange" : "text-red",
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {intentsityDetailText[intentsity === 0 ? 0 : 1]}
          </motion.p>
        </div>
      </div>
    </Module>
  );
};
