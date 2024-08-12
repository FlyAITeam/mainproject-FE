"use client";

import classNames from "classnames";
import { useRouter, usePathname } from "next/navigation";
import { Icon } from ".";

/**
 * BottomTab
 * - BottomTab 컴포넌트는 화면 하단에 위치하는 탭을 구성합니다.
 * - navList: 탭 목록을 정의합니다.
 * - Nav: 탭을 구성하는 컴포넌트입니다.
 * - pathname: 현재 경로를 가져옵니다.
 * - pathname과 navList의 path가 일치하면 active 클래스를 추가합니다.
 * - active 클래스를 추가하여 활성화된 탭을 표시합니다.
 * - BottomTab 컴포넌트를 생성합니다.
 * - navList를 순회하며 Nav 컴포넌트를 생성합니다.
 * - Nav 컴포넌트에 navList의 요소를 전달합니다.
 * - pathname과 navList의 path가 일치하는지 확인합니다.
 * - 일치하면 active를 true로 전달합니다.
 * - active가 true이면 활성화된 탭을 표시합니다.
 * - BottomTab 컴포넌트를 내보냅니다.
 * @param {string} name 탭 이름
 * @param {string} path 탭 경로
 * @param {string} icon 탭 아이콘
 * @param {boolean} active 활성화 여부
 * @returns {ReactNode} BottomTab 컴포넌트를 반환합니다.
 * @example
 * <BottomTab />
 */

const navList = [
  { name: "메인", path: "main", icon: "home" },
  { name: "병원찾기", path: "find", icon: "location" },
  { name: "마이", path: "mypage", icon: "setting" },
];

const Nav = ({ name, path, icon, active }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.replace("/" + path)}
      className={`active:opacity-50 ${active ? "text-green" : "text-grayText"}`}
      alt={name}
    >
      <Icon icon={icon} size={28} />
    </div>
  );
};

export const BottomTab = () => {
  const pathname = usePathname();
  const baseBottomTabClasses =
    "fixed z-10 left-0 bottom-0 w-full h-fit pb-8 flex flex-row bg-white";
  const actionAreaClasses = "flex-1 flex h-16 justify-center items-center";

  return (
    <div className={baseBottomTabClasses}>
      {navList.map((nav) => (
        <div key={nav.name} className={actionAreaClasses}>
          <Nav {...nav} active={pathname === "/" + nav.path} />
        </div>
      ))}
    </div>
  );
};
