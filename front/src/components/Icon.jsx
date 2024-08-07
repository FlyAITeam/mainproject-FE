import React from "react";
import classNames from "classnames";
import {
  IoAdd,
  IoAddCircle,
  IoClose,
  IoCloseCircle,
  IoAnalytics,
  IoChevronForward,
  IoChevronBack,
  IoChevronUp,
  IoChevronDown,
  IoNotifications,
  IoNotificationsOff,
  IoBluetooth,
  IoCall,
  IoCopy,
  IoCamera,
  IoChatboxEllipses,
  IoCheckboxOutline,
  IoSquareOutline,
  IoHome,
  IoImage,
  IoLocation,
  IoLockClosed,
  IoLockOpen,
  IoMenu,
  IoPencil,
  IoPaw,
  IoPulse,
  IoRefresh,
  IoSync,
  IoRemove,
  IoResize,
  IoSearch,
  IoSettings,
  IoShare,
  IoStatsChart,
  IoTime,
  IoTrashOutline,
  IoWarning,
  IoBatteryCharging,
  IoBatteryDead,
  IoBatteryFull,
  IoBatteryHalf,
} from "react-icons/io5";
import { IconContext } from "react-icons";

/**
 * Icon
 * - Icon 컴포넌트는 아이콘을 표시하는 컴포넌트입니다.
 * - 아이콘은 react-icons/io5 라이브러리를 사용합니다.
 * - 아이콘의 종류는 iconRegistry 객체에 저장되어 있습니다.
 * - 아이콘의 종류는 icon 속성으로 전달합니다.
 * - 아이콘의 색상은 color 속성으로 전달합니다.
 * - 아이콘의 크기는 size 속성으로 전달합니다.
 * - 스타일은 style 속성으로 전달합니다.
 * - 클릭 이벤트는 onClick 속성으로 전달합니다.
 * - 나머지 속성은 ...rest로 전달합니다.
 * @param {string} icon 아이콘의 종류
 * @param {string} color 아이콘의 색상
 * @param {number} size 아이콘의 크기
 * @param {object} style 아이콘의 스타일
 * @param {function} onClick 클릭 이벤트
 * @param {object} rest 나머지 속성
 * @returns {JSX.Element} 아이콘 컴포넌트
 * @example
 * <Icon icon="add" color="blue" size={24} />
 * <Icon icon="addCircle" color="red" size={32} />
 */

export const iconRegistry = {
  add: IoAdd,
  addCircle: IoAddCircle,
  close: IoClose,
  circleClose: IoCloseCircle,
  analytics: IoAnalytics,
  right: IoChevronForward,
  left: IoChevronBack,
  up: IoChevronUp,
  down: IoChevronDown,
  bell: IoNotifications,
  bellOff: IoNotificationsOff,
  bluetooth: IoBluetooth,
  call: IoCall,
  copy: IoCopy,
  camera: IoCamera,
  chatbox: IoChatboxEllipses,
  checkboxChecked: IoCheckboxOutline,
  checkbox: IoSquareOutline,
  home: IoHome,
  image: IoImage,
  location: IoLocation,
  lockClosed: IoLockClosed,
  lockOpen: IoLockOpen,
  menu: IoMenu,
  pencil: IoPencil,
  foot: IoPaw,
  pulse: IoPulse,
  refresh: IoRefresh,
  sync: IoSync,
  remove: IoRemove,
  resize: IoResize,
  search: IoSearch,
  settings: IoSettings,
  share: IoShare,
  chart: IoStatsChart,
  time: IoTime,
  trash: IoTrashOutline,
  warn: IoWarning,
  batteryCharge: IoBatteryCharging,
  batteryDead: IoBatteryDead,
  batteryFull: IoBatteryFull,
  batteryHalf: IoBatteryHalf,
};

export const Icon = ({ icon, color, size = 20, style, onClick, ...rest }) => {
  const IconComponent = iconRegistry[icon];

  const baseIconClasses = "focus:opacity-50 active:opacity-50";

  if (!IconComponent) return null;

  return (
    <div
      className={`focus:opacity-50 active:opacity-50`}
      onClick={onClick}
      {...rest}
    >
      <IconContext.Provider value={{ color, size, className: style }}>
        <IconComponent />
      </IconContext.Provider>
    </div>
  );
};
