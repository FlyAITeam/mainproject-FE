"use client";

import { Screen, AppTitle, Button } from "@/components";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <Screen>
      <div className="w-full h-full flex flex-col justify-center items-center space-y-4 p-4">
        <AppTitle />
      </div>
      <div className="w-full h-fit flex flex-col justify-center items-center space-y-4 p-4">
        <Button
          preset="default"
          className="w-full"
          onClick={() => router.push("/feature_test")}
        >
          시작하기
        </Button>
        <Button
          preset="reversed"
          className="w-full"
          onClick={() => router.push("/showroom")}
        >
          컴포넌트 미리보기
        </Button>
      </div>
    </Screen>
  );
}
