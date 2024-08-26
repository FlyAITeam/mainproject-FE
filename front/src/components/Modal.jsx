"use client";

import React, { use, useEffect } from "react";
import Image from "next/image";
import { Icon } from "./Icon";
import { Button } from ".";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import useModalStore from "@/stores/store";
// 그래프 차트 임포트
import { AlertExerciseChart, AlertHeartChart} from "@/app/main/components";
import { HeartChart } from "@/app/main/components";
import { SequenceChart } from "@/app/main/components";

// 
import {
  getHeartData,
  getExerciseData,
  getSequences,
} from "@/libs/getAnalysis";
import { useState } from "react";

export const Modal = ({ isModalOpen, type }) => {
  const [heartData, setHeartData] = useState([{time: 1000, heartRate: 0}]);
  const [exerciseData, setExerciseData] = useState({ target: 100, today: 0 });

  useEffect(() => {
    const loadHeartData = async () => {
      console.log("심박값 데이터 불러오기");
      try {
        const data = await getHeartData();
        console.log('heart data from', data.bcgData);
        await setHeartData(data.bcgData);
        await setIntensity(data.intensity);
      } catch (error) {
        console.error("심박값 데이터를 불러오는 중 오류 발생:", error);
        await setHeartData([{time: 0, heartRate: 100}]);
      }
    };

    const loadExerciseData = async () => {
      console.log("운동량 데이터 불러오기");
      console.log(exerciseData);
      try {
        const data = await getExerciseData();
        console.log(data);
        await setExerciseData({ 
          target: data.target, 
          today: Math.max(Math.min(data.today, data.target),0) 
        });
      } catch (error) {
        console.error("운동량 데이터를 불러오는 중 오류 발생:", error);
        await setExerciseData({ target: 100, today: 0 });
      }
    };
  

    loadHeartData();
    loadExerciseData();
  });
  
  const titleText = ["심박 이상 감지!", "운동량 부족 감지!"];
  const explainText = [
    "의 심박수에서 이상 패턴이 감지되었습니다. 병원 방문을 고려해주세요.",
    "의 운동량이 부족한 것으로 감지되었습니다. 산책 혹은 운동을 고려해주세요.",
  ];
  console.log("type", type);
  const closeModal = useModalStore((state) => state.closeModal);
  if(type==="심박수"){
    return (
      <>
        {isModalOpen && (
          <motion.div
            className="w-full h-full p-6 bg-black bg-opacity-30 backdrop-blur-sm fixed top-0 left-0 z-50 flex justify-center items-center"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full h-fit bg-white rounded-xl p-4 space-y-2 relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Icon
                icon="close"
                onClick={closeModal}
                className="absolute top-4 right-4 text-grayText active:opacity-50"
                size={24}
              />
              <div className="pt-4 w-full h-fit flex flex-row gap-1 justify-center items-center">
                <Icon icon="warning" size={30} className="text-red" />
                <span className="text-2xl text-red font-bold">
                  {type == "심박수" ? titleText[0] : titleText[1]}
                </span>
              </div>
              <div className="w-full h-fit">
                <p className="text-wrap px-4 text-center break-keep">
                  {"반려견" + explainText[type == "심박수" ? 0 : 1]}
                </p>
              </div>
              <div className="w-full h-fit py-4">
                <AlertHeartChart data={heartData} />
              </div>
              <div className="w-full h-fit flex flex-row space-x-2">
                {type == "심박수" ? (
                  <>
                    <Button
                      className="w-full bg-red border-red"
                      onClick={closeModal}
                    >
                      확인
                    </Button>
                    <Button
                      preset="reversed"
                      className="w-full text-red border-red"
                      onClick={closeModal}
                    >
                      취소
                    </Button>
                  </>
                ) : (
                  <Button
                    className="w-full bg-red border-red"
                    onClick={closeModal}
                  >
                    닫기
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </>
    );
  }else{
    return (
      <>
        {isModalOpen && (
          <motion.div
            className="w-full h-full p-6 bg-black bg-opacity-30 backdrop-blur-sm fixed top-0 left-0 z-50 flex justify-center items-center"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full h-fit bg-white rounded-xl p-4 space-y-2 relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Icon
                icon="close"
                onClick={closeModal}
                className="absolute top-4 right-4 text-grayText active:opacity-50"
                size={24}
              />
              <div className="pt-4 w-full h-fit flex flex-row gap-1 justify-center items-center">
                <Icon icon="warning" size={30} className="text-red" />
                <span className="text-2xl text-red font-bold">
                  {type == "심박수" ? titleText[0] : titleText[1]}
                </span>
              </div>
              <div className="w-full h-fit">
                <p className="text-wrap px-4 text-center break-keep">
                  {"반려견" + explainText[type == "심박수" ? 0 : 1]}
                </p>
              </div>
              <div className="w-full h-fit py-4">
                <AlertExerciseChart target={exerciseData.target} today={exerciseData.today} />
              </div>
              <div className="w-full h-fit flex flex-row space-x-2">
                {type == "심박수" ? (
                  <>
                    <Button
                      className="w-full bg-red border-red"
                      onClick={closeModal}
                    >
                      확인
                    </Button>
                    <Button
                      preset="reversed"
                      className="w-full text-red border-red"
                      onClick={closeModal}
                    >
                      취소
                    </Button>
                  </>
                ) : (
                  <Button
                    className="w-full bg-red border-red"
                    onClick={closeModal}
                  >
                    닫기
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </>
    );

  }
};
