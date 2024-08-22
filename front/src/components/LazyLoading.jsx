import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/**
 * Lazy Loading Component
 * @param {number} line - number of lines
 * @component
 * @example
 * return (
 *  <LazyLoading line={3} />
 * )
 * @returns <Skeleton count={line} />
 */

export const LazyLoading = ({ line }) => {
  return (
    <>
      <Skeleton line={line} />
    </>
  );
};
