// environments.js

// 1. env파일에서 service_uuid불러오기
import dotenv from 'dotenv';

// dotenv 설정
dotenv.config();

// 환경 변수 상수로 정의
const SERVICE_UUID = "RGSEG"
console.log(!!!process.env.SERVICE_UUID);

export { SERVICE_UUID };