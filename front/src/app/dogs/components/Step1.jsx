import Image from "next/image";

export const Step1 = ({ sectionRef }) => {
  return (
    <div
      ref={sectionRef}
      className="min-w-[100vw] h-full flex flex-col justify-center items-center p-4"
    >
      <div className="w-full h-fit flex flex-row justify-start pt-4 space-x-2 text-deepgreen">
        <div className="w-full h-fit flex flex-col font-bold text-2xl leading-tight">
          <span>사용자님,</span>
          <span>Petssist 가입을 환영합니다!</span>
        </div>
        <Image
          src="svgs/logo.svg"
          alt="logo"
          className="w-12 h-12"
          width={200}
          height={200}
        />
      </div>
      <div className="w-full h-full flex flex-col mt-8 px-2 pb-2 space-y-4 rounded-xl bg-green text-xl ">
        <span className="w-full h-fit px-6 pt-4  font-semibold text-white">
          이제 반려견의 정보를 등록해주세요!
        </span>
        <div className="bg-grayBackground w-full h-fit rounded-xl flex justify-center items-center ">
          <Image
            src="/imgs/banner.png"
            alt="dog"
            className="w-full h-full rounded-xl"
            width={960}
            height={1080}
          />
        </div>
      </div>
    </div>
  );
};
