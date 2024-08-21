"use client";

import { Module } from "@/components";
import Thermometer from "@/svgs/icons/thermometer.svg";

export const TemperatureModule = ({ temperature }) => {
  return (
    <Module
      title="체온"
      reload={() => console.log("reload")}
      className="w-full"
    >
      <div className="w-full h-fit flex flex-row justify-start items-center space-x-4">
        <div className="w-[30px] h-[50px] relative">
          <Thermometer width="30" height="50" />
        </div>
        <div className="w-fit flex flex-col justify-center items-start space-y-0 text-left">
          <p className="w-full text-xs font-medium text-grayText pl-[1px]">
            °C
          </p>
          <p className="w-full text-4xl font-bold text-black">{temperature}</p>
        </div>
        <div className="w-full h-fit flex flex-col justify-ceter items-end">
          <p className="w-fit flex text-xl bg-green px-4 py-1 rounded-full font-medium text-white">
            정상 체온
          </p>
        </div>
      </div>
    </Module>
  );
};
