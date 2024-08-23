"use client";

import { Module } from "@/components";
import BreatheHead from "@/svgs/icons/breatheHead.svg";
import BreatheTongue from "@/svgs/icons/breatheTongue.svg";

export const RespirationModule = ({ respiration }) => {
  return (
    <Module
      title="호흡수"
      reload={() => console.log("reload")}
      className="w-full"
    >
      <div className="w-full h-fit flex flex-row justify-start items-center space-x-4">
        <div className="w-[60px] h-[50px] relative z-10">
          <BreatheHead width="60" height="50" className="z-0" />
          <BreatheTongue
            width="60"
            height="50"
            className="absolute -z-10 bottom-0 animate-breathe-tongue"
          />
        </div>
        <div className="w-fit flex flex-col justify-center items-start space-y-0 text-left">
          <p className="w-full text-xs font-medium text-grayText pl-[1px]">
            회 / 분당
          </p>
          <p className="w-full text-4xl font-bold text-black">{respiration}</p>
        </div>
      </div>
    </Module>
  );
};
