"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Icon } from "./Icon";
import { Button } from ".";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import useModalStore from "@/stores/store";

export const Modal = ({ isModalOpen, type }) => {
  const titleText = ["심박 이상 감지!", "운동량 부족 감지!"];
  const explainText = [
    "의 심박수에서 이상 패턴이 감지되었습니다. 병원 방문을 고려해주세요.",
    "의 운동량이 부족한 것으로 감지되었습니다. 산책 혹은 운동을 고려해주세요.",
  ];

  const closeModal = useModalStore((state) => state.closeModal);

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
                {type === "bcg" ? titleText[0] : titleText[1]}
              </span>
            </div>
            <div className="w-full h-fit">
              <p className="text-wrap px-4 text-center break-keep">
                {"반려견" + explainText[type === "bcg" ? 0 : 1]}
              </p>
            </div>
            <div className="w-full h-fit py-4">...결과</div>
            <div className="w-full h-fit flex flex-row space-x-2">
              {type === "bcg" ? (
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
};
