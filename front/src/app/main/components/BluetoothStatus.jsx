"use client";

import classNames from "classnames";
import { Icon } from "@/components";
import { motion } from "framer-motion";

export const BluetoothStatus = ({ connectedBLE }) => {
  const baseDivClasses =
    "w-fit h-5 flex flex-row justify-end items-center bg-grayBackground text-black  rounded-full space-x-2 pl-3 pr-3";
  const dividerClasses = "h-3 border-l border-grayText pr-1 w-0";
  const deviceNameClasses = "text-sm font-regular pr-1";
  const batteryDivClasses =
    "w-fit h-fit flex flex-row justify-center items-center space-x-1";
  const batteryTextClasses = "text-xs font-medium";
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={baseDivClasses}
      >
        <Icon
          icon={
            connectedBLE.status == "connected" ? "bluetooth" : "bluetoothOff"
          }
          className={classNames(
            connectedBLE.status == "connected" ? "text-green" : "text-red",
          )}
          size="14"
        />
        <span className={dividerClasses} />
        <div className={deviceNameClasses}>{connectedBLE.device}</div>
        <span className={dividerClasses} />
        <div className={batteryDivClasses}>
          <div className={batteryTextClasses}>{connectedBLE.battery}%</div>
          <Icon
            icon={
              connectedBLE.battery < 30
                ? "batteryDead"
                : connectedBLE.battery < 70
                  ? "batteryHalf"
                  : "batteryFull"
            }
            size="18"
          />
        </div>
      </motion.div>
    </>
  );
};
