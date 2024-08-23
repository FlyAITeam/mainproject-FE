"use client";

import classNames from "classnames";
import { Module } from "@/components";
import { motion } from "framer-motion";
import { useState } from "react";

export const IntensityModule = ({ intensity }) => {
  // 상태별 설명을 위한 텍스트
  const intensityText = [
    "반려견이 수면 중입니다.",
    "반려견이 안정적인 상태입니다.",
    "반려견이 활동적인 상태입니다.",
    "반려견이 매우 활동적인 상태입니다.",
  ];

  const [isOpened, setIsOpened] = useState(false);

  return (
    <Module
      title="현재 상태"
      reload={() => console.log("reload")}
      getDetail={() => setIsOpened(!isOpened)}
      className="w-full"
    >
      <div className="w-full h-fit flex flex-row justify-between items-center">
        <div className="w-full h-fit flex flex-col justify-start items-start space-y-2">
          <motion.div
            className="w-full h-fit flex flex-row justify-center items-center rounded-lg bg-gradient-to-r from-green via-yellow to-red py-1 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {["수면중", "안정적", "활동적", "매우 활동적"].map(
              (label, index) => (
                <motion.span
                  key={index}
                  className={classNames(
                    "w-1/4 text-xs text-center py-0.5 rounded-lg",
                    intensity === index
                      ? getHighlightClass(index)
                      : "bg-none text-white",
                  )}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: intensity === index ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {label}
                </motion.span>
              ),
            )}
          </motion.div>
          {isOpened && (
            <>
              <motion.p
                className="h-fit text-sm text-black"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {intensityText[intensity]}
              </motion.p>

              {intensity !== 0 && (
                <motion.p
                  className="w-full h-fit text-xs text-red break-keep"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  - 수면상태가 아닐 때는 건강 정보가 부정확하며, 이상 징후를
                  확인할 수 없습니다.
                </motion.p>
              )}
            </>
          )}
        </div>
      </div>
    </Module>
  );
};

// 강조 표시를 위한 클래스 선택 함수
const getHighlightClass = (index) => {
  switch (index) {
    case 0:
      return "bg-green text-white";
    case 1:
      return "bg-white text-black";
    case 2:
      return "bg-orange text-white";
    case 3:
      return "bg-red text-white";
    default:
      return "bg-none text-white";
  }
};
