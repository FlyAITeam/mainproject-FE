"use client";
import { loginUser, isTokenAvailable } from '@/libs/authController';
import { registerDog } from '@/libs/dogInfo';

export default function Page() {
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
    </div>
  );
}