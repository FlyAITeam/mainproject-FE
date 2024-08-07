import classNames from "classnames";
import { Header, BottomTab } from ".";

/**
 * Screen
 * - Screen 컴포넌트는 화면 전체를 차지하는 컴포넌트입니다.
 * @param {string} header
 * @param {boolean} nav
 * @param {ReactNode} children
 * @returns {ReactNode}
 * @example
 * <Screen>
 *  <div>Content</div>
 * </Screen>
 * @example
 * <Screen nav>
 *  <div>Content</div>
 * </Screen>
 * @example
 * <Screen header={{ title: "제목" }}>
 * <div>Content</div>
 * </Screen>
 */

export const Screen = ({ header, nav, children, ...rest }) => {
  const baseScreenClasses =
    "w-full h-screen relative overflow-y-scroll flex flex-col justify-start items-center";

  return (
    <div
      className={classNames(
        baseScreenClasses,
        header ? `pt-10` : ``,
        nav ? `pb-28` : `pb-8`,
      )}
      {...rest}
    >
      {header && (
        <Header title={header.title} left={header.left} right={header.right} />
      )}
      {children}
      {nav && <BottomTab />}
    </div>
  );
};
