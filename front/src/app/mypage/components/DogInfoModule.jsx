"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Module } from "@/components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const DogInfoModule = ({ dogInfo }) => {
  const [detailInfo, setDetailInfo] = useState(false);

  const safeDogInfo = dogInfo || {};

  const overviewDivClasses =
    "w-full h-fit flex flex-row justify-between items-center";
  const overviewSpanClasses = "w-fit h-fit font-medium";
  const detailDivClasses =
    "flex flex-row justify-between items-center space-y-2";
  const detailRowClasses =
    "w-full h-full justify-start flex flex-col space-y-2";
  const detailSpanClasses = "w-full h-fit font-medium";

  return (
    <Module
      title="반려견 정보"
      getDetail={() => setDetailInfo(!detailInfo)}
      className="w-full border border-grayBorder"
    >
      <AnimatePresence>
        {!detailInfo ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={overviewDivClasses}
          >
            <span className={overviewSpanClasses}>
              <p className="text-grayText">
                {safeDogInfo.breed ? dogInfo.breed : <Skeleton width={60} />}
              </p>
            </span>
            <span className={overviewSpanClasses}>
              <p className="text-grayText">
                {safeDogInfo.breedCategory ? (
                  safeDogInfo.breedCategory === 1 ? (
                    "소형견"
                  ) : safeDogInfo.breedCategory === 2 ? (
                    "중형견"
                  ) : (
                    safeDogInfo.breedCategory === 3 && "대형견"
                  )
                ) : (
                  <Skeleton width={60} />
                )}
              </p>
            </span>
            <span className={overviewSpanClasses}>
              <p className="text-grayText">
                {safeDogInfo.sex ? (
                  `${safeDogInfo.sex == "male" ? "수컷" : safeDogInfo.sex == "female" ? "암컷" : "중성화"} / ${safeDogInfo.dogAge}살`
                ) : (
                  <Skeleton width={60} />
                )}
              </p>
            </span>
            <span className={overviewSpanClasses}>
              <p className="text-grayText">
                {safeDogInfo.weight ? (
                  `${safeDogInfo.weight}kg`
                ) : (
                  <Skeleton width={60} />
                )}
              </p>
            </span>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={detailDivClasses}
          >
            <div className={detailRowClasses}>
              <span className={detailSpanClasses}>
                <p className="">견종</p>
                <p className="text-grayText">
                  {safeDogInfo.breed || <Skeleton width={60} />}
                </p>
              </span>
              <span className={detailSpanClasses}>
                <p className="">분류</p>
                <p className="text-grayText">
                  {safeDogInfo.breedCategory ? (
                    safeDogInfo.breedCategory === 1 ? (
                      "소형견"
                    ) : safeDogInfo.breedCategory === 2 ? (
                      "중형견"
                    ) : (
                      safeDogInfo.breedCategory === 3 && "대형견"
                    )
                  ) : (
                    <Skeleton width={60} />
                  )}
                </p>
              </span>
            </div>
            <div className={detailRowClasses}>
              <span className={detailSpanClasses}>
                <p className="">성별 / 나이</p>
                <p className="text-grayText">
                  {safeDogInfo.sex ? (
                    `${safeDogInfo.sex == "male" ? "수컷" : safeDogInfo.sex == "female" ? "암컷" : "중성화"} / ${safeDogInfo.dogAge}살`
                  ) : (
                    <Skeleton width={60} />
                  )}
                </p>
              </span>
              <span className={detailSpanClasses}>
                <p className="">몸무게</p>
                <p className="text-grayText">
                  {safeDogInfo.weight ? (
                    `${safeDogInfo.weight}kg`
                  ) : (
                    <Skeleton width={60} />
                  )}
                </p>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Module>
  );
};
