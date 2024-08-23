"use client";

import { Module } from "@/components";
import classNames from "classnames";
import { motion } from "framer-motion";

export const TemperatureModule = ({ temperature }) => {
  return (
    <Module
      title="체온"
      reload={() => console.log("reload")}
      className="w-full"
    >
      <div className="w-full h-fit flex flex-row justify-between items-center space-x-4">
        <div className="w-fit pl-1 h-fit relative ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="58"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.5 40.895C0.944378 42.7098 0 45.0933 0 47.7041C0 53.3907 4.4768 58 10 58L10.0286 58L10.071 57.9998C15.5634 57.9605 20.0279 53.3054 19.9999 47.6505C19.9871 45.0606 19.0449 42.6974 17.5 40.895V7.72189C17.5 3.45724 14.1421 0 10 0C5.8579 0 2.5 3.45724 2.5 7.72189V40.895ZM4.66668 41.5648V7.5503C4.66668 4.51751 7.05454 2.05917 10 2.05917C12.9455 2.05917 15.3334 4.51751 15.3334 7.5503V41.5648C16.9701 43.073 18 45.2646 18 47.7041C18 52.2532 14.4183 55.9408 10 55.9408C5.58172 55.9408 2.00001 52.2532 2.00001 47.7041C2.00001 45.2646 3.02996 43.073 4.66668 41.5648Z"
              fill="black"
            />
            {temperature < 37 ? (
              <>
                <motion.circle
                  cx="6"
                  cy="6"
                  r="6"
                  transform="matrix(-1 0 0 1 16 42)"
                  fill="#0068FF"
                  initial={{ r: 0 }}
                  animate={{ r: 6 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13 36V44H7V36C7 34.3431 8.34315 33 10 33C11.6569 33 13 34.3431 13 36Z"
                  fill="#0068FF"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </>
            ) : temperature < 39 ? (
              <>
                <motion.circle
                  cx="6"
                  cy="6"
                  r="6"
                  transform="matrix(-1 0 0 1 16 42)"
                  fill="#00CB76"
                  initial={{ r: 0 }}
                  animate={{ r: 6 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7 22C7 20.3431 8.34315 19 10 19C11.6569 19 13 20.3431 13 22V45H7V22Z"
                  fill="#00CB76"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 23, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </>
            ) : (
              <>
                <motion.circle
                  cx="6"
                  cy="6"
                  r="6"
                  transform="matrix(-1 0 0 1 16 42)"
                  fill="#FF4E4E"
                  initial={{ r: 0 }}
                  animate={{ r: 6 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.circle
                  cx="3"
                  cy="3"
                  r="3"
                  transform="matrix(-1 0 0 1 13 8)"
                  fill="#FF4E4E"
                  initial={{ r: 0, opacity: 0 }}
                  animate={{ r: 3, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.rect
                  width="6"
                  height="40"
                  transform="matrix(-1 0 0 1 13 11)"
                  fill="#FF4E4E"
                  initial={{ height: 0 }}
                  animate={{ height: 40 }}
                  transition={{ duration: 0.5 }}
                />
              </>
            )}
          </svg>
        </div>
        <div className="w-fit flex flex-col justify-center items-start">
          <p className="w-full text-xs font-medium text-grayText pl-[1px]">
            °C
          </p>
          <motion.p
            className="w-full text-4xl font-bold text-black"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {temperature}
          </motion.p>
        </div>
        <div className="w-full pl-4 h-fit flex flex-col space-y-2 justify-start items-start">
          <motion.p
            className={classNames(
              "w-fit flex text-xs  px-4 py-1 rounded-xl font-semibold text-white",
              temperature < 37
                ? "bg-deepblue"
                : temperature < 39
                  ? "bg-green"
                  : "bg-red",
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {temperature < 37
              ? "저체온"
              : temperature < 39
                ? "정상체온"
                : "고열"}
          </motion.p>
          <p className="w-full text-xs text-grayText break-keep">
            {temperature < 37
              ? "체온이 너무 낮습니다. 따뜻한 곳에 머물게 해주세요."
              : temperature < 39
                ? "소형견은 37.5~39.0°C, 대형견은 37.5~38.5°C가 정상체온입니다."
                : "체온이 너무 높습니다. 시원한 곳에 머물게 해주세요."}
          </p>
        </div>
      </div>
    </Module>
  );
};
