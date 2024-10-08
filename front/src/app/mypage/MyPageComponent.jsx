"use client";

import classNames from "classnames";
import { Modal } from "@/components/Modal";
import { useModalStore } from "@/stores/store";
import Image from "next/image";
import {
  Screen,
  Icon,
  Header,
  Button,
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

/**
 * 페이지 -> 컴포넌트로 변경
 * 이전 코드 :
 * export default function Page() {
 * ...
 * return (
 *  <Screen nav>
    ....
    </Screen>
 * );
 * }
 *
 * 변경 코드 :
 * export default function MyPageComponent() {
 * ...
 * return (
 * <>
     ...
    </>
 * );
 * }
 *
 * 파일 이름도 변경
 * 이전 파일 이름 : page.jsx
 * 변경 파일 이름 : MyPageComponent.jsx
 * 
 */

export default function MyPageComponent() {
  const router = useRouter();

  const [pageDepth, setPageDepth] = useState(1);

  const [editMode, setEditMode] = useState(1);

  const sectionRefs = useRef([createRef(), createRef()]);

  const { scrollXProgress } = useScroll();
  const scrollX = useTransform(scrollXProgress, [0, 0.5, 1], [0, 50, 100]);

  const frameDivClasses = "w-screen h-full flex	overflow-x-hidden";
  const pageDivClasses =
    "w-full h-full flex flex-col items-center space-y-4 relative";

  const baseDivClasses =
    "w-screen h-fit flex flex-col justify-start items-center space-y-4 px-6 pt-4 pb-10";
  const sectionClasses =
    "w-full h-fit rounded-lg flex flex-col justify-center items-center space-y-2";

  const [userInfo, setUserInfo] = useState(null);
  const { isModalOpen, type, setType } = useModalStore();
  const [dogInfo, setDogInfo] = useState(null);

  const [prevImage, setPrevImage] = useState(null);

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

  // 아이디 수정하기
  const handleIdChange = (e) => {
    console.log(e.target.value);
    setPageDepth(1);
  };
  const handleIdSubmit = () => {
    console.log("아이디 수정하기");
  };

  // 비밀번호 수정하기
  const handlePasswordChange = (e) => {
    console.log(e.target.value);
    setPageDepth(1);
  };
  const handlePasswordSubmit = () => {
    console.log("비밀번호 수정하기");
  };

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
    <>
      <Modal isModalOpen={isModalOpen} type={type} />
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
                alone
                onClick={() => {
                  setEditMode(1);
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
                    setEditMode(2);
                    setPageDepth(2);
                  }}
                >
                  아이디 수정하기
                </Item>
                <Item
                  onClick={() => {
                    setEditMode(3);
                    setPageDepth(2);
                  }}
                >
                  비밀번호 수정하기
                </Item>
                <Item
                  onClick={() => {
                    console.log("로그아웃");
                    // 엑세스 토큰 제거
                    localStorage.removeItem("accessToken");
                    router.push("/");
                  }}
                  className="text-red"
                >
                  로그아웃
                </Item>
              </ListItems>
            </div>
            <DetailButton
              onClick={() => {
                setType("운동량");
                Notify("운동량");
              }}
            >
              알림 테스트 버튼 - 운동량
            </DetailButton>
            <DetailButton
              onClick={() => {
                setType("심박수");
                Notify("심박수");
              }}
            >
              알림 테스트 버튼 - 심박수
            </DetailButton>
            {/* <Modal isModalOpen={isModalOpen} type={modalType} /> */}
          </div>
        </motion.div>
        <motion.div ref={sectionRefs.current[1]} className={pageDivClasses}>
          <Header
            title={
              {
                1: "반려견 정보 수정하기",
                2: "아이디 수정하기",
                3: "비밀번호 수정하기",
              }[editMode]
            }
            left={{
              icon: "left",
              onClick: () => {
                setPageDepth(1), setEditMode(1);
              },
            }}
          />
          {editMode === 1 ? (
            <EditDog
              baseDivClasses={baseDivClasses}
              sectionClasses={sectionClasses}
              dogInfo={dogInfo}
              prevImage={prevImage}
            />
          ) : editMode === 2 ? (
            <EditId
              baseDivClasses={baseDivClasses}
              sectionClasses={sectionClasses}
              handleIdChange={handleIdChange}
              handleIdSubmit={handleIdSubmit}
            />
          ) : editMode === 3 ? (
            <EditPassword
              baseDivClasses={baseDivClasses}
              sectionClasses={sectionClasses}
              handlePasswordChange={handlePasswordChange}
              handlePasswordSubmit={handlePasswordSubmit}
            />
          ) : null}
        </motion.div>
      </div>
    </>
  );
}

const EditDog = (baseDivClasses, sectionClasses, dogInfo, prevImage) => {
  const [newImage, setNewImage] = useState(null);
  const [newDogProfile, setNewDogProfile] = useState({
    dogName: "",
    breed: "",
    breedCategory: 1,
    dogAge: "",
    sex: "male",
    weight: "",
  });

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
    setPageDepth(1);
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

      // 2. 강아지 사진 등록
      if (newImage) {
        const photoInfo = await uploadDogPhoto(newImage);
        console.log("강아지 사진 등록 성공:", photoInfo);
      }
    } catch (error) {
      console.error("강아지 정보 등록 중 오류:", error);
    }
  };

  return (
    <div className={classNames(baseDivClasses, "")}>
      <div className={classNames(sectionClasses)}>
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
        <div className="w-full h-fit flex flex-col -space-y-4">
          <Input
            label="반려견 이름"
            newLabelClasses="text-base"
            placeholder={dogInfo?.dogName}
            value={newDogProfile.dogName}
            onChange={(e) =>
              setNewDogProfile({
                ...newDogProfile,
                dogName: e.target.value,
              })
            }
          />
          <Input
            type="text"
            label="견종"
            newLabelClasses="text-base"
            placeholder={dogInfo?.breed}
            value={newDogProfile.breed}
            onChange={(e) =>
              setNewDogProfile({
                ...newDogProfile,
                breed: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full h-fit flex flex-row space-x-4">
          <Select
            required
            label="분류"
            newLabelClasses="text-base"
            placeholder={
              dogInfo?.breedCategory === 1
                ? "소형견"
                : dogInfo?.breedCategory === 2
                  ? "중형견"
                  : "대형견"
            }
            value={newDogProfile.breedCategory}
            onChange={(e) =>
              setNewDogProfile({
                ...newDogProfile,
                breedCategory: e.target.value,
              })
            }
            options={[
              { label: "소형견", value: 1 },
              { label: "중형견", value: 2 },
              { label: "대형견", value: 3 },
            ]}
          />

          <Select
            required
            label="성별"
            newLabelClasses="text-base"
            placeholder={dogInfo?.sex}
            value={newDogProfile.sex}
            onChange={(e) =>
              setNewDogProfile({
                ...newDogProfile,
                sex: e.target.value,
              })
            }
            options={[
              { label: "남", value: "male" },
              { label: "여", value: "female" },
              { label: "중성화", value: "neuter" },
            ]}
          />
        </div>
        <div className="w-full h-fit flex flex-row space-x-4">
          <Input
            required
            type="number"
            label="나이"
            newLabelClasses="text-base"
            placeholder={dogInfo?.dogAge}
            maxLength="3"
            value={newDogProfile.dogAge}
            onChange={
              (e) =>
                setNewDogProfile({
                  ...newDogProfile,
                  dogAge: e.target.value,
                })
              // threeNumberFunc
            }
            actionComponent={<span className="text-grayText pr-6">살</span>}
          />
          <Input
            required
            type="number"
            step="0.1"
            max="500"
            label="몸무게"
            newLabelClasses="text-base"
            placeholder={dogInfo?.weight}
            value={newDogProfile.weight}
            onChange={
              (e) =>
                setNewDogProfile({
                  ...newDogProfile,
                  weight: e.target.value,
                })
              // weightFunc
            }
            actionComponent={<span className="text-grayText pr-6">kg</span>}
          />
        </div>
        <Button
          className="w-full"
          onClick={() => handleDogProfileSubmit(newDogProfile)}
        >
          수정하기
        </Button>
      </div>
    </div>
  );
};

// 아이디 수정하기 페이지
const EditId = (
  baseDivClasses,
  sectionClasses,
  handleIdChange,
  handleIdSubmit,
) => {
  return (
    <div className={baseDivClasses}>
      <div className={classNames(sectionClasses, "pt-24")}>
        <Input
          required
          type="text"
          label="아이디"
          newLabelClasses="text-base"
          placeholder="아이디를 입력해주세요"
          onChange={handleIdChange}
        />
      </div>
      <Button className="w-full" onClick={handleIdSubmit}>
        수정하기
      </Button>
    </div>
  );
};
// 비밀번호 수정하기 페이지

const EditPassword = (
  baseDivClasses,
  sectionClasses,
  handlePasswordChange,
  handlePasswordSubmit,
) => {
  return (
    <div className={baseDivClasses}>
      <div className={classNames(sectionClasses, "pt-24")}>
        <Input
          required
          type="password"
          label="비밀번호"
          newLabelClasses="text-base"
          placeholder="비밀번호를 입력해주세요"
          onChange={handlePasswordChange}
        />
      </div>
      <Button className="w-full" onClick={handlePasswordSubmit}>
        수정하기
      </Button>
    </div>
  );
};
