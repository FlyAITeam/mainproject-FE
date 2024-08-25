"use client";

import classNames from "classnames";
import { Screen, AppTitle, Button } from "@/components";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  try{
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    // 로그인 창으로 이동
    try{
      if(accessToken){
        router.push('/main');
      }
    }catch(e){
      // 로그인 fail
      console.log('기존 로그인 정보가 잇긴한데..',e);
    }
  }catch(e){
    // 로그인 fail
    console.log('기존 로그인 정보가 없습니다.');
  }

  const topDivClasses =
    "w-full h-3/4 flex flex-col justify-center items-center space-y-4 p-4";
  const bottomDivClasses =
    "w-full h-1/4 flex flex-col justify-center items-center space-y-4 p-4";

  return (
    <Screen>
      <div className={topDivClasses}>
        <AppTitle />
      </div>
      <div className={bottomDivClasses}>
        <Button
          preset="default"
          className="w-full"
          onClick={() => router.push("/register")}
        >
          Petssist 시작하기
        </Button>
        <Button
          preset="reversed"
          className="w-full"
          onClick={() => router.push("/login")}
        >
          로그인 하기
        </Button>
      </div>
    </Screen>
  );
}
