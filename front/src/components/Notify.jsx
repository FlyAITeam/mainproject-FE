import toast from "react-hot-toast";
import Image from "next/image";

export const CustomToast = ({ t, text }) => {
  const handleClick = () => {
    localStorage.setItem("notify", "true"); // 클릭 후 다시 알림 받기
    toast.dismiss(t.id); // 클릭 후 토스트 닫기
  };

  return (
    <div className="w-screen h-fit flex" onClick={handleClick}>
      <div className="w-full h-fit p-4 bg-[#EEE] rounded-xl flex flex-row space-x-4 justify-center items-center shadow-md cursor-pointer">
        <Image src="/icons/icon.png" width={40} height={40} alt="Petssist" />
        <div className="flex flex-col w-full h-fit">
          <p className="font-medium text-black">
            ⚠️ 심박 이상 감지: 주의가 필요합니다!
          </p>
          <p className="text-xs text-grayText">
            복실이의 심박수에서 이상 패턴이 감지되었습니다. <br />
            병원 방문을 고려해주세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export const Notify = () => {
  toast.custom((t) => <CustomToast t={t} text={""} />);
};
