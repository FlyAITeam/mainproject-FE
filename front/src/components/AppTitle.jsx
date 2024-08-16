import Image from "next/image";

/**
 * AppTitle
 * - AppTitle은 Vetssist의 이름과 로고를 보여주는 컴포넌트입니다.
 * @returns {JSX.Element} AppTitle
 * @example
 * <AppTitle />
 */

export const AppTitle = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <p className="text-lg text-center text-grayText">
          반려견 헬스 케어 서비스 플랫폼
        </p>
        <div className="flex space-x-2">
          <h1 className="text-6xl font-bold text-center">Petssist</h1>
          <Image
            src="svgs/logo.svg"
            alt="logo"
            className="w-12 h-12"
            width={200}
            height={200}
          />
        </div>
      </div>
    </>
  );
};
