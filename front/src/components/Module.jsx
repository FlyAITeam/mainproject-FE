"use client";

import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { Icon } from "./Icon";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Module
 * - Module 컴포넌트는 제목과 내용을 가지는 모듈을 렌더링합니다.
 * @param {string} title - 모듈의 제목
 * @param {ReactNode} children - 모듈의 내용
 * @param {function} reload - 모듈을 새로고침하는 함수
 * @param {function} getDetail - 모듈의 내용을 토글하는 함수
 * @param {string} className - 모듈에 적용할 클래스
 */

export const Module = ({ title, children, reload, getDetail, className }) => {
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
    "flex flex-col w-full h-fit bg-grayBackground rounded-xl px-4 pt-3 pb-4 space-y-3 ";
  const headerDivClasses =
    "w-full h-fit flex flex-row justify-between items-center";
  const actionDivClasses =
    "w-fit h-fit flex flex-row justify-center items-center space-x-2";
  const actionButtonClasses = "w-fit h-fit rounded-full p-1 active:opacity-50";

  return (
    <div className={classNames(baseDivClasses, className)}>
      <div className={headerDivClasses}>
        <label className="text-md font-medium text-black">{title || ""}</label>
        <div className={actionDivClasses}>
          {reload && (
            <div
              onClick={() => {
                !onLoad && setOnLoad(true);
                reload();
              }}
              className={classNames(
                actionButtonClasses,
                onLoad ? "bg-green" : "bg-dimGray",
              )}
            >
              <Icon
                icon="sync"
                size={14}
                color="white"
                className={classNames(
                  "cursor-pointer",
                  onLoad ? "animate-spin" : "animate-none",
                )}
              />
            </div>
          )}
          {getDetail && (
            <div
              onClick={() => {
                setIsOpen(!isOpen);
                getDetail();
              }}
              className={classNames(actionButtonClasses, "bg-dimGray")}
            >
              <Icon
                icon={isOpen ? "up" : "down"}
                size={14}
                color="white"
                className="cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
      {children && <AnimatePresence>{children}</AnimatePresence>}
    </div>
  );
};
