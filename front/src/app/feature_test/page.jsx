"use client";
import React from 'react';
import { loginUser, isTokenAvailable } from '@/libs/authController';
import { registerDog } from '@/libs/dogInfo';

const Page = () => {
  // 1. 사용자 로그인
  const loginHandle = async () => {
    try {
      const data = await loginUser('decomia12', '1234');
      console.log('로그인 성공:', data);
    } catch (error) {
      console.error('로그인 중 오류:', error);
    }
  };

  // 2. 토큰 확인
  const isTokenAvailableHandle = async () => {
    try {
      const data = isTokenAvailable();
      console.log('토큰 확인 성공:', data);
    } catch (error) {
      console.error('토큰 확인 중 오류:', error);
    }
  };

  // 3. 강아지 정보 등록
  const handle = async () => {
    try {
      // registerDog
      const data = await registerDog('maru', 'poodle', 1, 23, 'male', 15.0);
      console.log('강아지 정보 등록 성공:', data);
    } catch (error) {
      console.error('강아지 정보 등록 중 오류:', error);
    }
  };
  
  return (
    <div>
      <div>
        <button onClick={loginHandle}>login</button>
      </div>
      <div>
        <button onClick={isTokenAvailableHandle}>isTokenAvailable</button>
      </div>
      <div>
        <button onClick={handle}>handle</button>
      </div>
    </div>
  );
};

export default Page;