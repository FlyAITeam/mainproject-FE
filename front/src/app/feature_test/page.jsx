"use client";
import React from 'react';
import { print_team_name, team_name } from '@/libs/test';

// 팀 이름 출력 (Pelikan)
const Page = () => {
  print_team_name(); // 콘솔 확인

  return (
    <div>
      <div>Team Name</div>
      <h1>{team_name}</h1>
    </div>
  );
};

export default Page;