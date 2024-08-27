import Image from "next/image";

export const Step1 = ({ sectionRef }) => {
  return (
    <div
      ref={sectionRef}
      className="min-w-[100vw] h-full flex flex-col justify-between gap-4 items-center p-4"
    >
      <div className="w-full h-fit flex flex-row justify-start items-center pt-2 space-x-4 text-deepgreen">
        <Image
          src="svgs/logo.svg"
          alt="logo"
          className="w-16 h-16 bg-white rounded-full p-2 shadow-md"
          width={200}
          height={200}
        />
        <div className="w-fit h-fit flex flex-col font-bold text-xl leading-tight">
          <span>사용자님,</span>
          <span>Petssist 가입을 환영합니다!</span>
        </div>
      </div>
      <div className="w-fit h-full flex flex-col px-2 pb-2 space-y-4 rounded-xl bg-green text-lg ">
        <span className="w-full h-fit px-6 pt-4 text-center font-semibold text-white">
          이제 반려견의 정보를 등록해주세요!
        </span>
        <div className="bg-grayBackground w-full h-full overflow-hidden rounded-xl flex justify-center items-start ">
          <Image
            src="/imgs/banner.png"
            alt="dog"
            className="w-full h-fit rounded-xl"
            width={480}
            height={540}
          />
        </div>
      </div>
    </div>
  );
};
