"use client";
import React, { useRef, useState } from "react";

/**
 * Input
 * - Input 컴포넌트는 input 태그를 렌더링합니다.
 * @param {string} label
 * @param {string} placeholder
 * @param {string} value
 * @param {function} onChange
 * @param {object} styles
 * @param  {...any} rest
 * @returns {ReactNode}
 * @example
 *
 * const [inputValue, setInputValue] = useState("");
 * const handleInputChange = (e) => {
 * setInputValue(e.target.value);
 * };
 *
 * <Input
 * label="Label"
 * placeholder="Place holder"
 * value=""
 * onChange={() => {}}
 * />
 */

export const Input = ({
  label,
  placeholder,
  value,
  onChange,
  styles,
  ...rest
}) => {
  const input = useRef();

  const baseDivClasses = "w-full h-fit flex flex-col space-y-1";
  const labelClasses = "text-sm px-2 text-textGray";
  const inputClasses =
    "w-full min-h-12 text-md px-4 border border-grayBorder rounded-xl focus:outline-none focus:border-green";

  return (
    <div className={baseDivClasses}>
      {label && <label className={labelClasses}>{label}</label>}
      <input
        ref={input}
        className={inputClasses}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};
