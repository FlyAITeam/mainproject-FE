import { useState } from "react";
import Image from "next/image";
import { Icon, Input } from "@/components";

export const Step2 = ({
  sectionRef,
  dogProfile,
  setDogProfile,
  previewImage,
  handleImageChange,
}) => {
  return (
    <div
      ref={sectionRef}
      className="min-w-[100vw] h-full flex flex-col justify-start items-center p-4"
    >
      <div className="w-full h-fit flex pb-10 justify-start items-center text-2xl font-bold text-deepgreen">
        반려견 사진과 이름을 알려주세요!
      </div>
      <div className="w-56 h-56 rounded-full bg-grayBackground overflow-hidden flex justify-center items-center">
        <label
          htmlFor="dogImage"
          className="w-full h-full z-10 flex flex-col justify-center items-center cursor-pointer relative active:opacity-50"
        >
          {previewImage ? (
            <>
              <Icon icon="edit" className="text-white" size={24} />
              <span className="text-sm text-white font-medium">
                사진 변경하기
              </span>
              <Image
                className="absolute -z-10 top-0 leftp-0 w-full h-full"
                src={previewImage}
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
      <div className="w-full h-fit mt-4 flex justify-start items-center ">
        <Input
          label="반려견 이름"
          placeholder="반려견 이름을 입력해주세요"
          required
          value={dogProfile.dogName}
          onChange={(e) =>
            setDogProfile({ ...dogProfile, dogName: e.target.value })
          }
        />
      </div>
    </div>
  );
};
