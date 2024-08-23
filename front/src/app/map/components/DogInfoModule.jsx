"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Module } from "@/components";

export const DogInfoModule = ({ dogInfo }) => {
  const [detailInfo, setDetailInfo] = useState(false);

  return (
    <Module
      title="반려견 정보"
      reload={() => console.log("reload")}
      getDetail={() => setDetailInfo(!detailInfo)}
      className="w-full"
    >
      <AnimatePresence>
        {!detailInfo ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full h-full flex flex-row justify-between items-center"
          >
            <span className="w-fit h-fit font-medium">
              <p className="text-grayText">{dogInfo.breed}</p>
            </span>
            <span className="w-fit h-fit font-medium">
              <p className="text-grayText">
                {dogInfo.breedCategory === 1
                  ? "소형견"
                  : dogInfo.breedCategory === 2
                    ? "중형견"
                    : dogInfo.breedCategory === 3 && "대형견"}
              </p>
            </span>
            <span className="w-fit h-fit font-medium">
              <p className="text-grayText">
                {dogInfo.sex === "male"
                  ? "수컷"
                  : dogInfo.sex === "female"
                    ? "암컷"
                    : "중성화"}{" "}
                / {dogInfo.dogAge}살
              </p>
            </span>
            <span className="w-fit h-fit font-medium">
              <p className="text-grayText">{dogInfo.weight}kg</p>
            </span>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-row justify-between items-center space-y-2"
          >
            <div className="w-full h-full justify-start flex flex-col space-y-2">
              <span className="w-full font-medium">
                <p className="">견종</p>
                <p className="text-grayText">{dogInfo.breed}</p>
              </span>
              <span className="w-full font-medium">
                <p className="">분류</p>
                <p className="text-grayText">
                  {dogInfo.breedCategory === 1
                    ? "소형견"
                    : dogInfo.breedCategory === 2
                      ? "중형견"
                      : dogInfo.breedCategory === 3 && "대형견"}
                </p>
              </span>
            </div>
            <div className="w-full h-full justify-start flex flex-col space-y-2">
              <span className="w-full font-medium">
                <p className="">성별 / 나이</p>
                <p className="text-grayText">
                  {dogInfo.sex === "male"
                    ? "남"
                    : dogInfo.sex === "female"
                      ? "여"
                      : "중성화"}{" "}
                  / {dogInfo.dogAge}살
                </p>
              </span>
              <span className="w-full font-medium">
                <p className="">몸무게</p>
                <p className="text-grayText">{dogInfo.weight}kg</p>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Module>
  );
};
