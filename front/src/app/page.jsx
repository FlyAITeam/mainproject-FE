"use client";

import classNames from "classnames";
import { Screen, AppTitle, Button } from "@/components";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/libs/authManager";
import { useState, useEffect } from "react";

export default function Page() {

  const router = useRouter();
  useEffect(() => {
    const checkUser = async () => {
      try{
        const userInfo = await getUserInfo();
        if (userInfo) {
          router.push("/main");
        }
      }catch(e){
        // 자동로그인 ㄴㄴ
        console.log('자동로그인 ㄴㄴ');
      }
    }
    checkUser();    
  });

  const topDivClasses = "w-full h-3/4 flex flex-col justify-center items-center space-y-4 p-4";
  const bottomDivClasses = "w-full h-1/4 flex flex-col justify-center items-center space-y-4 p-4";

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
