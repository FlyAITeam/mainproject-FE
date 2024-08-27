import toast from "react-hot-toast";
import Image from "next/image";
import { useModalStore } from "@/stores/store";

const CustomPush = ({ t, type }) => {
  const { openModal } = useModalStore();

  if (type === "심박수") {
    return (
      <div
        onClick={() => {
          toast.dismiss(t.id); // 클릭 후 토스트 닫기
          openModal();
        }}
        className="w-full h-full flex flex-row space-x-4 justify-center items-center cursor-pointer"
      >
        <Image src="/icons/icon.png" width={40} height={40} alt="Petssist" />
        <div className="flex flex-col gap-1 w-full h-fit">
          <p className="font-medium text-black">
            ⚠️ 심박 이상 감지: 주의가 필요합니다!
          </p>
          <p className="text-xs text-grayText">
            복실이의 심박수에서 이상 패턴이 감지되었습니다. <br />
            병원 방문을 고려해주세요.
          </p>
        </div>
      </div>
    );
  } else if (type === "운동량") {
    return (
      <div
        onClick={() => {
          toast.dismiss(t.id); // 클릭 후 토스트 닫기
          openModal();
        }}
        className="w-full h-full flex flex-row space-x-4 justify-center items-center cursor-pointer"
      >
        <Image src="/icons/icon.png" width={40} height={40} alt="Petssist" />
        <div className="flex flex-col gap-1 w-full h-fit">
          <p className="font-medium text-black">
            ⚠️ 운동 부족 감지: 주의가 필요합니다!
          </p>
          <p className="text-xs text-grayText">
            복실이의 운동량이 부족한 것으로 감지되었습니다. <br />
            산책 혹은 운동을 고려해주세요.
          </p>
        </div>
      </div>
    );
  }
};

export const Notify = (type) => {
  // console.log("type", type);
  toast((t) => <CustomPush t={t} type={type} />, {
    duration: 2000,
    style: {
      background: "#EEE",
    },
  });
};
