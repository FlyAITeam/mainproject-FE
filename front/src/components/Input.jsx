"use client";
import React, { useRef, useState } from "react";
import { Icon } from ".";

/**
 * Input
 * - Input 컴포넌트는 input 태그를 렌더링합니다.
 * @param {string} label
 * @param {string} placeholder
 * @param {string} value
 * @param {function} onChange
 * @param {object} styles
 * @param {object} innerButton
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
 * value={inputValue}
 * onChange={handleInputChange}
 * />
 *
 * <Input
 * label="Label"
 * placeholder="Place holder"
 * value={inputValue}
 * onChange={handleInputChange}
 * innerActionComponent={
 * <Icon icon="IoSearch" color="green" size={5} />
 * }
 * />
 */

export const Input = ({
  label,
  placeholder,
  value,
  onChange,
  innerActionComponent,
  styles,
  ...rest
}) => {
  const input = useRef();

  const baseDivClasses = "w-full h-fit flex flex-col space-y-1 relative";
  const labelClasses = "text-sm px-2 text-textGray";
  const inputClasses =
    "w-full min-h-12 text-md px-4 border border-grayBorder rounded-xl focus:outline-none focus:border-green";
  const innerActionClasses =
    "absolute text-sm text-green z-2 top-9 right-4 w-fit h-fit rounded-xl z-2 active:outline-none active:border-none active:opacity-50";

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
      {innerActionComponent && (
        <div className={innerActionClasses}>{innerActionComponent}</div>
      )}
    </div>
  );
};
