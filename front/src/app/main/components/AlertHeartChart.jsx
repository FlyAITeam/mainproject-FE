import React from "react";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, PointElement, LinearScale, Title, Tooltip, Legend, TimeScale, LineElement } from "chart.js";
import 'chartjs-adapter-moment';

ChartJS.register(PointElement, LinearScale, Title, Tooltip, Legend, TimeScale, LineElement);

export const AlertHeartChart = ({ bcgData }) => {  
  // 값이 없을 경우 더 불규칙한 100개의 데이터셋을 직접 생성
  if (!bcgData || bcgData.length === 0) {
    bcgData = [
      { time: 0, heart: 80 },
      { time: 0.3, heart: 90 },
      { time: 1.0, heart: 60 },
      { time: 1.8, heart: 95 },
      { time: 3.2, heart: 72 },
      { time: 4.0, heart: 88 },
      { time: 5.5, heart: 65 },
      { time: 6.7, heart: 78 },
      { time: 7.1, heart: 85 },
      { time: 8.5, heart: 62 },
      { time: 9.8, heart: 93 },
      { time: 10.5, heart: 70 },
      { time: 12.0, heart: 89 },
      { time: 13.6, heart: 68 },
      { time: 15.1, heart: 92 },
      { time: 16.4, heart: 75 },
      { time: 18.2, heart: 82 },
      { time: 19.9, heart: 60 },
      { time: 20.7, heart: 95 },
      { time: 22.4, heart: 71 },
      { time: 23.8, heart: 90 },
      { time: 25.3, heart: 67 },
      { time: 26.9, heart: 88 },
      { time: 28.5, heart: 73 },
      { time: 30.0, heart: 84 },
      { time: 31.7, heart: 66 },
      { time: 33.4, heart: 91 },
      { time: 35.0, heart: 74 },
      { time: 37.2, heart: 85 },
      { time: 38.8, heart: 62 },
      { time: 40.5, heart: 93 },
      { time: 42.1, heart: 69 },
      { time: 43.9, heart: 87 },
      { time: 45.6, heart: 64 },
      { time: 47.0, heart: 90 },
      { time: 48.7, heart: 75 },
      { time: 50.3, heart: 92 },
      { time: 51.9, heart: 70 },
      { time: 53.5, heart: 84 },
      { time: 55.0, heart: 65 },
      { time: 56.7, heart: 89 },
      { time: 58.3, heart: 76 },
      { time: 60.0, heart: 82 },
    ];
  }

  const data = {
    datasets: [{
        label: 'Heart Rate',
        data: bcgData.map(entry => ({ x: entry.time, y: entry.heart })),
        showLine: true,
        backgroundColor: '#FF0000',  // 배경색을 빨간색으로 설정
        borderColor: '#FF0000',      // 경계선을 빨간색으로 설정
        pointRadius: 0,  // 점을 표시하지 않도록 설정
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: 'Time',
        },
        ticks: {
          display: false, // X축 값 숨기기
        },
        grid: {
          display: false, // X축 그리드 숨기기
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Heart Rate',
        },
        ticks: {
          display: false, // Y축 값 숨기기
        },
        grid: {
          display: false, // Y축 그리드 숨기기
        },
      }
    },
    plugins: {
      tooltip: {
        enabled: false,  // 툴팁 비활성화
      },
      legend: {
        display: false,  // 레이블 숨기기
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Scatter data={data} options={options} />
    </div>
  );
};
