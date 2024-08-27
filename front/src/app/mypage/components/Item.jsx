"use client";

import classNames from "classnames";
import { motion } from "framer-motion";

export const Item = ({ onClick, children, className, alone }) => {
  const baseDivClasses =
    "w-full h-fit flex flex-col justify-center items-center  text-black  rounded-xl px-4";
  const itemClasses =
    "w-full h-fit flex flex-row  gap-2 justify-center items-center py-3 bg-white  border-grayBorder  active:text-green";
  const solo = "rounded-xl";
  const duple =
    "rounded-t-xl rounded-b-none last:rounded-b-xl  last:border-b-0 border-b last:border-b-0";

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={classNames(itemClasses, alone ? solo : duple, className)}
        onClick={() => onClick()}
      >
        {children}
      </motion.div>
    </>
  );
};
