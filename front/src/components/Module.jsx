"use client";

import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { Icon } from "./Icon";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Module
 * - Module 컴포넌트는 제목과 내용을 가지는 모듈을 렌더링합니다.
 * @param {string} title
 * @param {ReactNode} main
 * @param {ReactNode} detail
 * @param {string} className
 * @returns {ReactNode}
 * @example
 * <Module
 * title="제목"
 * main={<div>메인</div>}
 * detail={<div>상세</div>}
 * />
 * */

export const Module = ({ title, main, detail, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [onLoad, setOnLoad] = useState(false);

  useEffect(() => {
    if (onLoad) {
      setTimeout(() => {
        setOnLoad(false);
      }, 500);
    }
  }, [onLoad]);

  const baseDivClasses =
    "flex flex-col w-full h-fit bg-grayBackground rounded-xl px-4 pt-3 pb-4 space-y-3";
  const headerDivClasses =
    "w-full h-fit flex flex-row justify-between items-center";
  const actionDivClasses =
    "w-fit h-fit flex flex-row justify-center items-center space-x-2";
  const actionButtonClasses = "w-fit h-fit rounded-full p-1 active:bg-green";
  const hideButtonClasses =
    "w-full h-fit text-center justify-center flex flex-row gap-1 text-xs text-grayText mt-2 active:opacity-50";

  return (
    <div className={classNames(baseDivClasses, className)}>
      <div className={headerDivClasses}>
        <label className="text-lg font-medium">{title || "제목"}</label>
        <div className={actionDivClasses}>
          <div
            className={classNames(
              actionButtonClasses,
              onLoad ? "bg-green" : "bg-grayText",
            )}
          >
            <Icon
              icon="sync"
              size={14}
              color="white"
              onClick={() => !onLoad && setOnLoad(true)}
              className={classNames(
                "cursor-pointer",
                onLoad ? "animate-spin" : "animate-none",
              )}
            />
          </div>
          <div
            className={classNames(
              actionButtonClasses,
              isOpen ? "bg-green" : "bg-grayText",
            )}
          >
            <Icon
              icon={isOpen ? "up" : "down"}
              size={14}
              color="white"
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
      <AnimatePresence initial={false}>
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ overflow: "hidden" }}
        >
          {!isOpen ? (
            <div className="" onClick={() => setIsOpen(true)}>
              {main}
            </div>
          ) : (
            <div className="">
              {detail}
              <div
                onClick={() => setIsOpen(false)}
                className={hideButtonClasses}
              >
                닫기
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
