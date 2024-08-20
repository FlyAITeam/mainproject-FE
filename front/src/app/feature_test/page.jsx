"use client";
import { useState } from 'react';
import { loginUser, isTokenAvailable } from '@/libs/authController';
import { registerDog, getDogInfo, updateDog, uploadDogPhoto } from '@/libs/dogInfo';

export default function Page() {
  const [photoFile, setPhotoFile] = useState(null);

  // 1. 로그인
  const login = async () => {
    try {
      const response = await loginUser('decomia12', '1234');
      console.log('로그인 성공:', response);
    } catch (error) {
      console.error('로그인 중 오류:', error);
    }
  };

  // 2. 토큰 확인
  const checkToken = async () => {
    try {
      const response = await isTokenAvailable();
      console.log('토큰 확인 성공:', response);
    } catch (error) {
      console.error('토큰 확인 중 오류:', error);
    }
  };

  // 3. 강아지 등록
  const register = async () => {
    try {
      const response = await registerDog('maru', 'just', 1, 23, 'male', 15.0);
      console.log('강아지 등록 성공:', response);
    } catch (error) {
      console.error('강아지 등록 중 오류:', error);
    }
  };

  // 4. 강아지 정보 조회
  const getDog = async () => {
    try {
      const response = await getDogInfo();
      console.log('강아지 정보 조회 성공:', response);
    } catch (error) {
      console.error('강아지 정보 조회 중 오류:', error);
    }
  };

  // 5. 강아지 정보 수정
  const update = async () => {
    try {
      const response = await updateDog('maru2', 'just2', 2, 13, 'female', 15.0);
      console.log('강아지 정보 수정 성공:', response);
    }
    catch (error) {
      console.error('강아지 정보 수정 중 오류:', error);
    }
  }

  // 6. 강아지 사진 등록
  const uploadPhoto = async () => {
    try {
      const photo = await uploadDogPhoto(photoFile);
      console.log('강아지 사진 등록 성공:', photo);
    } catch (error) {
      console.error('강아지 사진 등록 중 오류:', error);
    }
  }

  const handleFileChange = (event) => {
    setPhotoFile(event.target.files[0]);
  };

  const handleUploadClick = () => {
    document.getElementById('fileInput').click();
  };

  // FOX 버튼 클릭 시 사진 업로드 및 강아지 사진 등록 API 호출
  const fox = async () => {
    if (photoFile) {
      await uploadPhoto();
    } else {
      console.log('사진 파일이 없습니다.');
    }
  }

  return (
    <div>
      <div>
        <button onClick={login}>로그인</button>
      </div>
      <div>
        <button onClick={checkToken}>토큰 확인</button>
      </div>
      <div>
        <button onClick={register}>강아지 등록</button>
      </div>
      <div>
        <button onClick={getDog}>강아지 정보 조회</button>
      </div>
      <div>
        <button onClick={update}>강아지 정보 수정</button>
      </div>
      <div>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button onClick={handleUploadClick}>강아지 사진 선택</button>
        {photoFile && <button onClick={fox}>사진 업로드 및 등록</button>}
      </div>
    </div>
  );
}
