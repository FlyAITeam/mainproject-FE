"use client";

import classNames from "classnames";
import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from ".";

/**
 * Input
 * - Input 컴포넌트는 input 태그를 렌더링합니다.
 * @param {string} label - Input의 라벨
 * @param {string} placeholder - Input의 placeholder
 * @param {string} value - Input의 value
 * @param {function} onChange - Input의 onChange 이벤트
 * @param {ReactNode} actionComponent - Input의 액션 컴포넌트
 * @param {ReactNode} guideComponent - Input의 가이드 컴포넌트
 * @returns {ReactNode} Input 컴포넌트를 반환합니다.
 * @example
 * <Input
 * label="Input"
 * placeholder="여기에 입력하세요"
 * value={inputValue}
 * onChange={handleInputChange}
 * actionComponent={<Button>버튼</Button>}
 * guideComponent={<Icon icon="search" size={16} />}
 * />
 */

export const Input = ({
  label,
  newLabelClasses,
  placeholder,
  value,
  onChange,
  actionComponent,
  guideComponent,
  ...rest
}) => {
  const input = useRef();

  const baseDivClasses = "w-full h-fit flex flex-col space-y-1";
  const labelClasses = "text-lg px-2 mb-2 text-deepgreen font-medium";
  const inputDivClasses =
    "w-full h-fit flex flex-col justify-center items-start space-y-2 relative";
  const inputClasses =
    "w-full min-h-12 text-md px-4 border border-grayBorder rounded-xl focus:outline-none focus:border-green";
  const guideDivClasses =
    "text-xs font-regular w-fit h-4 flex flex-row px-2 rounded-xl active:outline-none active:border-none active:opacity-50";
  const guideClasses = "flex flex-row items-center";

  return (
    <div className={baseDivClasses}>
      {label && (
        <label className={classNames(labelClasses, newLabelClasses)}>
          {label}
        </label>
      )}
      <div className={inputDivClasses}>
        <input
          ref={input}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...rest}
        />
        {actionComponent && (
          <div className="absolute right-4 top-0 w-fit h-8 flex justify-center items-center active:opacity-50">
            {actionComponent}
          </div>
        )}
        <div className={guideDivClasses}>
          <AnimatePresence>
            {guideComponent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={guideClasses}
              >
                {guideComponent}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
