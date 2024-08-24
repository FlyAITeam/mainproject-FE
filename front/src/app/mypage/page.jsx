"use client";

import classNames from "classnames";
import Image from "next/image";
import { Screen, Icon, Header } from "@/components";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, createRef } from "react";
import { getUserInfo } from "@/libs/authManager";
import { getDogInfo, getDogPhoto } from "@/libs/petInfoManager";
import { DogInfoModule, ListItems, Item, ProfileSection } from "./components";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Page() {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState(null);
  const [dogInfo, setDogInfo] = useState(null);
  const [dogPhoto, setDogPhoto] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedUserInfo = await getUserInfo();
        setUserInfo(fetchedUserInfo);

        const fetchedDogInfo = await getDogInfo();
        setDogInfo(fetchedDogInfo);

        const fetchedDogPhoto = await getDogPhoto();
        setDogPhoto(fetchedDogPhoto);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    };

    loadData();
  }, []);

  const baseDivClasses =
    "w-screen h-fit flex flex-col justify-start items-center space-y-4 px-6 pt-8 pb-10";
  const sectionClasses =
    "w-full h-fit rounded-lg flex flex-col justify-center items-center space-y-2";

  const [pageDepth, setPageDepth] = useState(1);

  const sectionRefs = useRef([createRef(), createRef()]);

  const { scrollXProgress } = useScroll();
  const scrollX = useTransform(scrollXProgress, [0, 0.5, 1], [0, 50, 100]);

  const frameDivClasses = "w-screen h-full flex  overflow-x-hidden";
  const pageDivClasses =
    "w-full h-full flex flex-col items-center space-y-4 relative";

  useEffect(() => {
    const targetSection = sectionRefs.current[pageDepth - 1].current;
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    }
  }, [pageDepth]);

  return (
    <Screen nav>
      <div className={frameDivClasses} style={{ x: scrollX }}>
        <motion.div ref={sectionRefs.current[0]} className={pageDivClasses}>
          <div className={baseDivClasses}>
            <div className={sectionClasses}>
              <ProfileSection
                userInfo={userInfo}
                dogInfo={dogInfo}
                dogPhoto={dogPhoto}
              />
            </div>
            <div className={sectionClasses}>
              <span className="w-full h-fit text-md text-left font-medium text-black pt-4">
                반려견 정보 관리
              </span>
              <DogInfoModule dogInfo={dogInfo} />
              <Item
                onClick={() => {
                  setPageDepth(2);
                }}
              >
                <Icon icon="dog" size={16} />
                반려견 정보 수정하기
              </Item>
              <span className="w-full h-fit text-md text-left font-medium text-black pt-4">
                사용자 계정 관리
              </span>
              <ListItems>
                <Item
                  onClick={() => {
                    setPageDepth(1);
                  }}
                >
                  아이디 수정하기
                </Item>
                <Item
                  onClick={() => {
                    setPageDepth(1);
                  }}
                >
                  비밀번호 수정하기
                </Item>
                <Item
                  onClick={() => {
                    setPageDepth(1);
                  }}
                  className="text-red"
                >
                  로그아웃
                </Item>
              </ListItems>
            </div>
          </div>
        </motion.div>
        <motion.div ref={sectionRefs.current[1]} className={pageDivClasses}>
          <Header
            title="반려견 정보 수정하기"
            left={{
              icon: "left",
              onClick: () => setPageDepth(1),
            }}
          />
          <div className={baseDivClasses}>
            <div className={sectionClasses}>
              <span className="w-full h-fit text-md text-left font-medium text-black pt-4">
                사용자 계정 관리
              </span>
              <ListItems>
                <Item
                  onClick={() => {
                    setPageDepth(1);
                  }}
                >
                  아이디 수정하기
                </Item>
                <Item
                  onClick={() => {
                    setPageDepth(1);
                  }}
                >
                  비밀번호 수정하기
                </Item>
                <Item
                  onClick={() => {
                    setPageDepth(1);
                  }}
                  className="text-red"
                >
                  로그아웃
                </Item>
              </ListItems>
            </div>
          </div>
        </motion.div>
      </div>
    </Screen>
  );
}
