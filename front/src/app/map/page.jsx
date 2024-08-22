"use client";

import { Screen } from "@/components";
import { useRouter } from "next/navigation";
import KakaoMap from "@/components/KakaoMap";  

export default function Page() {
  const router = useRouter();

  return (
    <Screen nav>
      <div className="flex flex-col items-center justify-center w-full h-full p-4">
        <div className="w-full h-full max-w-3xl">
          <KakaoMap/>
        </div>
      </div>
    </Screen>
  );
}
