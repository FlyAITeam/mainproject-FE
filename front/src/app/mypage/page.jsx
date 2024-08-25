"use client";

import classNames from "classnames";
import Image from "next/image";
import {
  Screen,
  Icon,
  Header,
  DetailButton,
  Notify,
  Input,
  Select,
} from "@/components";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, createRef } from "react";
import { getUserInfo } from "@/libs/authManager";
import { DogInfoModule, ListItems, Item, ProfileSection } from "./components";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  getDogInfo,
  getDogPhoto,
  updateDog,
  uploadDogPhoto,
} from "@/libs/petInfoManager";

export default function Page() {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState(null);

  const [dogInfo, setDogInfo] = useState(null);
  const [newDogProfile, setNewDogProfile] = useState({
    dogName: "",
    breed: "",
    breedCategory: 1,
    dogAge: "",
    sex: "male",
    weight: "",
  });

  const [prevImage, setPrevImage] = useState(null);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedUserInfo = await getUserInfo();
        setUserInfo(fetchedUserInfo);

        const fetchedDogInfo = await getDogInfo();
        setDogInfo(fetchedDogInfo);

        const fetchedDogPhoto = await getDogPhoto();
        setPrevImage(fetchedDogPhoto);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    };

    loadData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);

      const reader = new FileReader();
      reader.onload = (e) => setPrevImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDogProfileSubmit = async (dogProfile) => {
    console.log("Uploading dog profile ... ", dogProfile);
    try {
      // 1. 강아지 정보 수정
      const dogInfo = await updateDog(
        dogProfile.dogName,
        dogProfile.breed,
        parseInt(dogProfile.breedCategory),
        parseInt(dogProfile.dogAge),
        dogProfile.sex,
        parseFloat(dogProfile.weight),
      );
      console.log("강아지 정보 수정 성공:", dogInfo);

      // 2. 강아지 사진 등록 (일단 보류)
      if (newImage) {
        const photoInfo = await uploadDogPhoto(newImage);
        console.log("강아지 사진 등록 성공:", photoInfo);
      }
    } catch (error) {
      console.error("강아지 정보 등록 중 오류:", error);
    }
  };

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
                dogPhoto={prevImage}
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
            <DetailButton
              onClick={() => {
                Notify();
              }}
            >
              알림 테스트 버튼
            </DetailButton>
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
              <div className="w-56 h-56 rounded-full bg-grayBackground overflow-hidden flex justify-center items-center">
                <label
                  htmlFor="dogImage"
                  className="w-full h-full z-10 flex flex-col justify-center items-center cursor-pointer relative active:opacity-50"
                >
                  {prevImage ? (
                    <>
                      <Icon icon="edit" className="text-white" size={24} />
                      <span className="text-sm text-white font-medium">
                        사진 변경하기
                      </span>
                      <Image
                        className="absolute -z-10 top-0 leftp-0 w-full h-full"
                        src={prevImage}
                        alt="dog"
                        width={512}
                        height={512}
                      />
                    </>
                  ) : (
                    <>
                      <Icon icon="camera" className="text-grayText" size={32} />
                      <span className="text-sm font-medium">사진 추가하기</span>
                    </>
                  )}
                  <input
                    id="dogImage"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <span className="w-full h-fit text-md text-left font-medium text-black pt-4">
                반려견 정보 관리
              </span>
              <ListItems>
                <Item
                  onClick={() => {
                    setPageDepth(1);
                  }}
                >
                  <Input
                    placeholder={dogInfo?.dogName}
                    required
                    value={newDogProfile.dogName}
                    onChange={(e) =>
                      setDogProfile({ ...dogProfile, dogName: e.target.value })
                    }
                  />
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
                    console.log("로그아웃");
                    // setPageDepth(1);
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
