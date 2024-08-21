"use client";

import { Screen } from "@/components";
import { useRouter } from "next/navigation";
import KakaoMap from "@/components/KakaoMap";

export default function Page() {
  const router = useRouter();
  const userInfo = {
    loginId: "pelikan",
    name: "김동욱",
  };

  const dogInfo = {
    dogName: "복실이",
    breed: "치와와",
    breedCategory: 1,
    dogAge: 7,
    sex: "male",
    weight: 4.5,
  };

  return (
    <Screen nav>
      <div className="flex flex-col items-center justify-center w-full h-full p-4">
        <div className="w-full h-full max-w-3xl">
          <KakaoMap />
        </div>
      </div>
    </Screen>
  );
}
