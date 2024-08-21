"use client";

import classNames from "classnames";
import { useState } from "react";
import { AppTitle, Screen, Input, Button, Icon } from "@/components";
import { useRouter } from "next/navigation";
import { loginUser } from "@/libs/authManager";

export default function Page() {
  const router = useRouter();
  const topDivClasses =
    "w-full h-1/5 flex flex-col mt-10 justify-end items-center p-4";
  const centerDivClasses =
    "w-full h-3/5 flex flex-col pt-12 justify-start items-center p-4";
  const bottomDivClasses =
    "w-full h-1/5 flex flex-col justify-center items-center space-y-4 p-4";

  const [loginInfo, setLoginInfo] = useState({
    id: "",
    password: "",
  });

  const [isPasswordShown, setIsPasswordShown] = useState(false);

  /** TODO: 로그인 요청 @안호준 */
  const handleLogin = async (loginInfo) => {
    console.log("Login... ", loginInfo);
    try {
      const data = await loginUser(loginInfo.id, loginInfo.password);
      console.log("로그인 성공:", data);
      router.replace("/main");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다.");
    }
  };

  return (
    <Screen
      isFixed
      header={{
        title: "로그인",
        left: {
          icon: "left",
          onClick: () => router.replace("/"),
        },
      }}
    >
      <div className={topDivClasses}>
        <AppTitle />
      </div>
      <div className={centerDivClasses}>
        <Input
          label="아이디"
          placeholder="아이디를 입력해주세요"
          value={loginInfo.id}
          onChange={(e) => setLoginInfo({ ...loginInfo, id: e.target.value })}
        />
        <Input
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          value={loginInfo.password}
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, password: e.target.value })
          }
          actionComponent={
            <Icon
              className="text-grayText"
              onClick={() => setIsPasswordShown(!isPasswordShown)}
              icon={isPasswordShown ? "eye" : "eyeOff"}
              size={18}
            />
          }
        />
      </div>
      <div className={bottomDivClasses}>
        <Button
          preset="default"
          className="w-full"
          onClick={() =>
            loginInfo.id && loginInfo.password
              ? handleLogin(loginInfo)
              : loginInfo.id
                ? alert("비밀번호를 입력해주세요.")
                : loginInfo.password
                  ? alert("아이디를 입력해주세요.")
                  : alert("아이디와 비밀번호를 입력해주세요.")
          }
        >
          로그인
        </Button>
      </div>
    </Screen>
  );
}
