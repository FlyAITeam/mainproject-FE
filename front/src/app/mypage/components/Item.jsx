"use client";

import classNames from "classnames";
import { Icon } from "@/components";
import { motion } from "framer-motion";

export const Item = ({}) => {
  const baseDivClasses =
    "w-full h-fit flex flex-col justify-center items-center bg-grayBackground text-black  rounded-xl px-4";
  const itemClasses =
    "w-full h-fit flex flex-row  gap-2 justify-center items-center py-4 border-b border-grayBorder last:border-b-0 active:text-green";

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={baseDivClasses}
      >
        <div className={itemClasses}>
          <Icon icon="dog" size={16} />
          반려견 정보 수정하기
        </div>
      </motion.div>
    </>
  );
};
