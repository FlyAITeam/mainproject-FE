import React from "react";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, PointElement, LinearScale, Title, Tooltip, Legend, TimeScale, LineElement } from "chart.js";
import 'chartjs-adapter-moment';

ChartJS.register(PointElement, LinearScale, Title, Tooltip, Legend, TimeScale, LineElement);

export const AlertHeartChart = ({ bcgData }) => {  
  // 값이 없을 경우 더 불규칙한 100개의 데이터셋을 직접 생성
  if (!bcgData || bcgData.length === 0) {
    bcgData = [
      { time: 0, heart: 78 },
      { time: 0.4, heart: 85 },
      { time: 1.1, heart: 67 },
      { time: 2.3, heart: 90 },
      { time: 3.7, heart: 72 },
      { time: 5.0, heart: 88 },
      { time: 6.4, heart: 75 },
      { time: 7.2, heart: 82 },
      { time: 8.9, heart: 69 },
      { time: 9.6, heart: 94 },
      { time: 10.3, heart: 71 },
      { time: 11.7, heart: 86 },
      { time: 13.1, heart: 74 },
      { time: 14.8, heart: 92 },
      { time: 15.5, heart: 70 },
      { time: 17.2, heart: 89 },
      { time: 18.9, heart: 68 },
      { time: 20.3, heart: 91 },
      { time: 21.7, heart: 73 },
      { time: 22.9, heart: 87 },
      { time: 25.5, heart: 76 }, // 큰 간격
      { time: 26.8, heart: 83 },
      { time: 28.2, heart: 69 },
      { time: 29.7, heart: 93 },
      { time: 31.4, heart: 71 },
      { time: 33.0, heart: 88 },
      { time: 34.2, heart: 77 },
      { time: 35.8, heart: 84 },
      { time: 37.0, heart: 70 },
      { time: 39.5, heart: 92 }, // 큰 간격
      { time: 40.8, heart: 75 },
      { time: 42.1, heart: 87 },
      { time: 43.3, heart: 72 },
      { time: 45.0, heart: 90 },
      { time: 46.7, heart: 74 },
      { time: 47.9, heart: 89 },
      { time: 49.2, heart: 68 },
      { time: 51.0, heart: 91 },
      { time: 52.3, heart: 73 },
      { time: 53.8, heart: 85 },
      { time: 55.0, heart: 70 },
      { time: 57.5, heart: 94 }, // 큰 간격
      { time: 58.7, heart: 78 },
      { time: 60.0, heart: 86 },
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
