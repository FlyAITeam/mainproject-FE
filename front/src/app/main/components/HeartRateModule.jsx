"use client";

import { Module } from "@/components";
import Heart from "@/svgs/icons/heart.svg";

export const HeartRateModule = ({ heartRate }) => {
  return (
    <Module title="심박수" className="w-full">
      <div className="w-full h-fit flex flex-row justify-start items-center space-x-4">
        <div className="w-[60px] h-[50px] relative">
          <Heart width="60" height="50" className="animate-heartbeat" />
        </div>
        <div className="w-fit flex flex-col justify-center items-start space-y-0 text-left">
          <p className="w-full text-xs font-medium text-grayText pl-[1px]">
            bpm
          </p>
          <p className="w-full text-4xl font-bold text-black">{heartRate}</p>
        </div>
      </div>
    </Module>
  );
};
