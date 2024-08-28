"use client";

import { Screen } from "@/components";
import { useRouter } from "next/navigation";
import KakaoMap from "@/components/KakaoMap";
import PetMap from "@/components/PetMap";

export default function Page() {

  return (
    <Screen nav>
      <div className="flex flex-col items-center justify-center w-full h-full p-4">
        <div className="w-full h-full max-w-3xl">
          <PetMap/>
        </div>
      </div>
    </Screen>
  );
}
