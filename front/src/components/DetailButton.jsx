import React from "react";
import classNames from "classnames";

/**
 * DetailButton
 * - DetailButton 컴포넌트는 자세히 혹은 더보기에 사용하는 버튼을 렌더링합니다.
 * @param {ReactNode} children
 * @param {object} styles
 * @param {boolean} disabled
 * @param {function} onClick
 * @returns {ReactNode}
 * @example
 * <DetailButton
 * disabled={false}
 * onClick={() => alert("자세히 버튼을 눌렀습니다!")}
 * >
 * 자세히
 * </DetailButton>
 */

export const DetailButton = ({
  children,
  styles,
  disabled,
  onClick,
  ...rest
}) => {
  const baseButtonClasses =
    "w-fit h-fit text-sm flex flex-row justify-center text-grayText border-b border-grayText items-center active:opacity-50";

  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <button
      className={classNames(
        baseButtonClasses,
        disabled && disabledClasses,
        styles,
      )}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};
