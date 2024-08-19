"use client";
import classNames from "classnames";
import React, { useRef, useState } from "react";
import { Icon } from "./Icon";

/**
 * Select
 * - Select 컴포넌트는 select 태그를 렌더링합니다.
 * @param {string} label
 * @param {string} placeholder
 * @param {string} value
 * @param {function} onChange
 * @param {array} options
 * @param {object} styles
 * @param  {...any} rest
 * @returns {ReactNode}
 * @example
 *
 * const [selectedOption, setSelectedOption] = useState("");
 * const handleSelectChange = (e) => {
 * setSelectedOption(e.target.value);
 * };
 *
 * <Select
 * label="Select"
 * placeholder="옵션을 선택하세요"
 * value={selectedOption}
 * onChange={handleSelectChange}
 * options={[
 * { label: "옵션1", value: "option1" },
 * { label: "옵션2", value: "option2" },
 * ]}
 * />
 */

export const Select = ({
  label,
  placeholder,
  value,
  onChange,
  options,
  styles,
  ...rest
}) => {
  const select = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);

  const handleOptionClick = (option) => {
    setSelectedOption(option.value);
    onChange({ target: { value: option.value } });
    setIsOpen(false);
  };

  const baseDivClasses = "w-full h-fit flex flex-col space-y-1";
  const labelClasses = "text-xl px-2 mb-2 text-deepgreen font-semibold";
  const selectClasses =
    "relative w-full min-h-12 flex flex-row justify-between items-center bg-white text-md px-4 border rounded-xl active:outline-none active:border-green";
  const dropdownClasses =
    "absolute top-12 left-0 w-full bg-white border border-grayBorder rounded-xl z-10 overflow-hidden";
  const optionClasses =
    "px-4 first:pt-3 py-2 last:pb-3 active:bg-grayBackground cursor-pointer";

  return (
    <div className={baseDivClasses}>
      {label && <label className={labelClasses}>{label}</label>}
      <div
        ref={select}
        className={classNames(
          selectClasses,
          isOpen ? `border-green` : `border-grayBorder`,
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {options.find((option) => option.value === selectedOption)?.label ||
            placeholder}
        </span>
        <Icon icon="down" color={isOpen ? `#00CB76` : `#909090`} size={24} />
        {/* Dropdown arrow */}
        {isOpen && (
          <div className={dropdownClasses}>
            {options.map((option) => (
              <div
                key={option.value}
                className={optionClasses}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
