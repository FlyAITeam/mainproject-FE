import classNames from "classnames";

/**
 * Col
 * - flex-col을 적용한 컴포넌트
 * @param {Object} children - 자식 컴포넌트
 * @param {string} className - 추가할 클래스명
 * @param {string} padding - padding 값
 * @param {string} gap - gap 값
 * @return {JSX.Element} Col
 * @example
 * <Col padding={4} gap={4}>
 *  <div>1</div>
 * <div>2</div>
 * </Col>
 */

export const Col = ({ children, className, padding, gap }) => {
  const baseColClasses = "flex flex-col w-fit h-fit";
  const paddingClasses = {
    2: "p-2",
    4: "p-2",
    6: "p-3",
    8: "p-4",
    10: "p-5",
    12: "p-6",
  };
  const gapClasses = {
    2: "gap-2",
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
    10: "gap-10",
    12: "gap-12",
  };

  return (
    <div
      className={classNames(
        baseColClasses,
        className,
        padding && paddingClasses[padding],
        gap && gapClasses[gap],
      )}
    >
      {children}
    </div>
  );
};
