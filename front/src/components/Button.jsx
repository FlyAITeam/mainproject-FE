"use client";

import React from "react";
import classNames from "classnames";
import { motion } from "framer-motion";

/**
 * Button
 * - Button 컴포넌트는 버튼을 렌더링합니다.
 * @param {ReactNode} children
 * @param {string} preset
 * @param {string} className
 * @param {boolean} disabled
 * @param {function} onClick
 * @returns {ReactNode}
 * @example
 * <Button
 * preset="default"
 * onClick={() => alert("버튼1을 눌렀습니다!")}
 * >
 * 버튼1
 * </Button>
 **/

export const Button = ({
  children,
  preset = "default",
  className,
  disabled,
  onClick,
  ...rest
}) => {
  const baseButtonClasses =
    "min-w-20 min-h-12 text-md font-medium rounded-xl flex flex-row justify-center items-center py-2 px-4 overflow-hidden border";

  const presetClasses = {
    default:
      "border-green bg-green text-white active:border-green active:bg-white active:text-deepgreen",
    reversed:
      "border-green bg-white text-deepgreen active:border-green active:bg-green active:text-white",
    disabled:
      "border-green border-none bg-green bg-opacity-50 text-white cursor-not-allowed",
  };

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={classNames(
        baseButtonClasses,
        presetClasses[disabled ? "disabled" : preset],
        className,
      )}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </motion.button>
  );
};
