"use client";

import classNames from "classnames";
import { Icon } from "@/components";
import { motion } from "framer-motion";

export const ListItems = ({}) => {
  const baseDivClasses =
    "w-full h-fit flex flex-col justify-center items-center bg-grayBackground text-black  rounded-xl px-4";
  const itemClasses =
    "w-full h-fit flex flex-col justify-start items-center py-4 border-b border-grayBorder last:border-b-0 active:text-green";

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={baseDivClasses}
      >
        <div className={itemClasses}>아이디 수정하기</div>
        <div className={itemClasses}>비밀번호 수정하기</div>
        <div className={classNames(itemClasses, "text-red")}>로그아웃</div>
      </motion.div>
    </>
  );
};
